import { useEffect, useState } from "react";
import { getLinks, deleteLink } from "../Services/linksService";
import { copyToClipboard } from "../Utils/copyToClipboard";
import { toast } from "react-toastify";
import "../Styles/Link.css"


const Links = () => {
    const [links, setLinks] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchLinks();
    }, [currentPage]);

    const fetchLinks = async () => {
        try {
            const data = await getLinks(currentPage);
            setLinks([...data.docs]);
            setTotalPages(data.totalPages);
        } catch (error) {
            toast.error("Failed to fetch links");
        }
    };

    const handleDelete = async (linkId) => {
        if (!window.confirm("Are you sure you want to delete this link?")) return;
        try {
            await deleteLink(linkId);
            setLinks((prev) => prev.filter((link) => link._id !== linkId));
            toast.success("Link deleted successfully");
        } catch (error) {
            toast.error("Error deleting link");
        }
    };

    const filteredLinks = links.filter((link) =>
        link.remarks.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="links-container">
            <div className="links-header">
                <input
                    type="text"
                    placeholder="Search by remarks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
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
                                <button className="delete-btn" onClick={() => handleDelete(link._id)}>🗑</button>
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
        </div>
    );
};

export default Links;
