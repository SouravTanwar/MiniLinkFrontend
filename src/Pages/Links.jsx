import React, { useEffect, useState, useContext } from "react";
import { SearchContext } from "../Contexts/SearchContext";
import { getLinks, deleteLink, updateLink } from "../Services/linksService";
import { copyToClipboard } from "../Utils/copyToClipboard";
import { toast } from "react-toastify";
import CreateEditLinkModal from "../Modals/CreateEditLinkModal";
import Modal from "../Modals/alertModal";
import { useTable, usePagination } from "react-table";
import "./Links.css";

const Links = () => {
    const [links, setLinks] = useState([]);
    const { searchTerm } = useContext(SearchContext);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLink, setSelectedLink] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const fetchLinks = async (page) => {
        try {
            const data = await getLinks(page);
            setLinks(data.docs);
            setTotalPages(data.totalPages);
        } catch (error) {
            toast.error("Failed to fetch links");
        }
    };

    useEffect(() => {
        fetchLinks(1); 
    }, []);

    const handleEditLink = async (data) => {
        try {
            await updateLink(selectedLink._id, data);
            toast.success("Link updated");
            fetchLinks(pageIndex + 1); 
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

    const columns = React.useMemo(
        () => [
            {
                Header: "Date",
                accessor: "createdAt",
                Cell: ({ value }) => new Date(value).toLocaleDateString(),
            },
            {
                Header: "Original Link",
                accessor: "originalLink",
            },
            {
                Header: "Short Link",
                accessor: "shortLink",
                Cell: ({ value }) => (
                    <div className="short-link-container">
                        <span className="short-link">
                        https://minilinkbackend.onrender.com/api/v1/links/r/{value}
                        </span>
                        <button onClick={() => copyToClipboard(value)}>
                            📋
                        </button>
                    </div>
                ),
            },
            {
                Header: "Remarks",
                accessor: "remarks",
            },
            {
                Header: "Clicks",
                accessor: "clicks",
            },
            {
                Header: "Status",
                accessor: "status",
                Cell: ({ value }) => (
                    <span className={`status ${value === "active" ? "active" : "inactive"}`}>
                        {value}
                    </span>
                ),
            },
            {
                Header: "Actions",
                Cell: ({ row }) => (
                    <div>
                        <button
                            className="edit-btn"
                            onClick={() => {
                                setSelectedLink(row.original);
                                setIsModalOpen(true);
                            }}
                        >
                            📝
                        </button>
                        <button
                            className="delete-btn"
                            onClick={() => {
                                setSelectedLink(row.original);
                                setShowDeleteModal(true);
                            }}
                        >
                            🗑️
                        </button>
                    </div>
                ),
            },
        ],
        [selectedLink]
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        previousPage,
        nextPage,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data: filteredLinks,
            initialState: { pageIndex: 0 },
            manualPagination: true,
            pageCount: totalPages,
        },
        usePagination
    );

    return (
        <div className="links-container">
            <table className="links-table" {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="pagination">
                <button
                    onClick={() => {
                        previousPage();
                        fetchLinks(pageIndex);
                    }}
                    disabled={!canPreviousPage}
                >
                    Previous
                </button>
                <span className="page-no">
                    Page <strong>{pageIndex + 1} of {totalPages}</strong>
                </span>
                <button
                    onClick={() => {
                        nextPage();
                        fetchLinks(pageIndex + 2);
                    }}
                    disabled={!canNextPage}
                >
                    Next
                </button>
            </div>

            {isModalOpen && (
                <CreateEditLinkModal
                    isOpen={isModalOpen}
                    linkData={selectedLink}
                    onClose={() => setIsModalOpen(false)}
                    onSave={(editLinkData) => handleEditLink(editLinkData)}
                />
            )}
            {showDeleteModal && (
                <Modal
                    message="Are you sure, you want to remove it?"
                    onConfirm={handleDelete}
                    onCancel={() => setShowDeleteModal(false)}
                    isDelete={true}
                />
            )}
        </div>
    );
};

export default Links;
