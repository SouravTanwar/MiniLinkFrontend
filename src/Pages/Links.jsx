import { useEffect, useState, useContext } from "react";
import DataTable from "react-data-table-component";
import { SearchContext } from "../Contexts/SearchContext";
import { getLinks, deleteLink, updateLink } from "../Services/linksService";
import { copyToClipboard } from "../Utils/copyToClipboard";
import { toast } from "react-toastify";
import CreateEditLinkModal from "../Modals/CreateEditLinkModal";
import Modal from "../Modals/alertModal";
import "./Links.css";

const Links = () => {
    const [links, setLinks] = useState([]);
    const { searchTerm } = useContext(SearchContext);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLink, setSelectedLink] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        fetchLinks(currentPage);
    }, [currentPage]);

    const fetchLinks = async (page) => {
        try {
            setLoading(true);
            const data = await getLinks(page);
            setLinks(data.docs);
            setTotalPages(data.totalPages);
        } catch (error) {
            toast.error("Failed to fetch links");
        } finally {
            setLoading(false);
        }
    };

    const handleEditLink = async (data) => {
        try {
            await updateLink(selectedLink._id, data);
            toast.success("Link updated");
            fetchLinks(currentPage);
        } catch (error) {
            toast.error("Link not updated!");
        }
    };

    const handleDelete = async () => {
        try {
            const linkId = selectedLink._id;
            await deleteLink(linkId);
            setLinks((prev) => prev.filter((link) => link._id !== linkId));
            toast.success("Link deleted successfully");
            setShowDeleteModal(false);
        } catch (error) {
            toast.error("Error deleting link");
        }
    };

    const filteredLinks = links.filter((link) =>
        link.remarks.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            name: "Date",
            selector: (row) => {
                const date = new Date(row.createdAt);
                return date.toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                });
            },
            sortable: true,
        },
        {
            name: "Original Link",
            selector: (row) => row.originalLink,
            sortable: false,
            cell: (row) => <div className="fade-text">{row.originalLink}</div>,
        },
        {
            name: "Short Link",
            selector: (row) => `https://minilinkbackend.onrender.com/api/v1/links/r/${row.shortLink}`,
            sortable: false,
            cell: (row) => (
                <div className="short-link-container">
                    <span className="fade-text">
                        {`https://minilinkbackend.onrender.com/api/v1/links/r/${row.shortLink}`}
                    </span>
                    <button className="copy-btn" onClick={() => copyToClipboard(row.shortLink)}>
                        <span className="material-symbols-outlined">content_copy</span>
                    </button>
                </div>
            ),
        },
        {
            name: "Remarks",
            selector: (row) => row.remarks,
            sortable: false,
        },
        {
            name: "Clicks",
            selector: (row) => row.clicks,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: false,
            cell: (row) => (
                <span className={`status ${row.status === "active" ? "active" : "inactive"}`}>
                    {row.status}
                </span>
            ),
        },
        {
            name: "Actions",
            cell: (row) => (
                <div>
                    <button
                        className="edit-btn"
                        onClick={() => {
                            setSelectedLink(row);
                            setIsModalOpen(true);
                        }}
                    >
                        <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button
                        className="delete-btn"
                        onClick={() => {
                            setSelectedLink(row);
                            setShowDeleteModal(true);
                        }}
                    >
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="links-container">
            <DataTable
                columns={columns}
                data={filteredLinks}
                progressPending={loading}
                pagination
                paginationPerPage={10}
                paginationComponent={() => (
                    <div className="pagination">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                                className={currentPage === index + 1 ? "active" : ""}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            &gt;
                        </button>
                    </div>
                )}
            />

            {isModalOpen && (
                <CreateEditLinkModal
                    isOpen={isModalOpen}
                    linkData={selectedLink}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleEditLink}
                />
            )}
            {showDeleteModal && (
                <Modal
                    message="Are you sure you want to remove it?"
                    onConfirm={handleDelete}
                    onCancel={() => setShowDeleteModal(false)}
                />
            )}
        </div>
    );
};

export default Links;
