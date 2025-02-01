import { useEffect, useState, useContext } from "react";
import { SearchContext } from "../Contexts/SearchContext";
import { getLinks, deleteLink, updateLink } from "../Services/linksService";
import { copyToClipboard } from "../Utils/copyToClipboard";
import { toast } from "react-toastify";
import CreateEditLinkModal from "../Modals/CreateEditLinkModal";
import Modal from "../Modals/alertModal";
import "../Styles/Link.css"


const Links = () => {
    const [links, setLinks] = useState([]);
    const { searchTerm } = useContext(SearchContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLink, setSelectedLink] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        fetchLinks();
    }, [currentPage]);

    const fetchLinks = async () => {
        try {
            const data = await getLinks(currentPage);
            setLinks(data.docs);
            setTotalPages(data.totalPages);
        } catch (error) {
            toast.error("Failed to fetch links");
        }
    };

    const handleEditLink = async (data) => {
        try {
            await updateLink(selectedLink._id, data);
            toast.success("link updated");
            fetchLinks();
        } catch (error) {
            console.log(error)
            toast.error("link not updated!");
        }
    }

    const handleDelete = async () => {
        
        try {
            const linkId=selectedLink._id
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

    return (
        <div className="links-container">
            <div className="links-header">
            </div>

            <table className="links-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Short Link</th>
                        <th>Original Link</th>
                        <th>Remarks</th>
                        <th>Clicks</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLinks.map((link) => (
                        <tr key={link._id}>
                            <td>{new Date(link.createdAt).toLocaleDateString()}</td>
                            <td>
                                <span className="short-link">http://localhost:8000/api/v1/links/r/{link.shortLink}</span>
                                <button onClick={() => copyToClipboard(link.shortLink)}>📋</button>
                            </td>
                            <td>{link.originalLink}</td>
                            <td>{link.remarks}</td>
                            <td>{link.clicks}</td>
                            <td>{link.status}</td>
                            <td>
                                <button onClick={() => {
                                    setSelectedLink(link);
                                    setIsModalOpen(true);
                                }}>✏️</button>
                                <button className="delete-btn" onClick={() => {
                                    setSelectedLink(link);
                                    setShowDeleteModal(true);
                                    }}>🗑</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="pagination">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                    Next
                </button>
            </div>
            {isModalOpen && (
                <CreateEditLinkModal 
                    isOpen={isModalOpen}
                    linkData={selectedLink} 
                    onClose={() => setIsModalOpen(false)} 
                    onSave={(editLinkData) => {handleEditLink(editLinkData)}}
                />
            )}
            {showDeleteModal && (
                <Modal
                    message="Are you sure, you want to remove it"
                    onConfirm={handleDelete}
                    onCancel={() => setShowDeleteModal(false)}
                    isDelete={true}
                />
            )}
        </div>
    );
};

export default Links;
