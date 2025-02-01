import React, { useEffect, useState, useContext } from "react";
import { SearchContext } from "../Contexts/SearchContext";
import { getLinks, deleteLink, updateLink } from "../Services/linksService";
import { copyToClipboard } from "../Utils/copyToClipboard";
import { toast } from "react-toastify";
import CreateEditLinkModal from "../Modals/CreateEditLinkModal";
import Modal from "../Modals/alertModal";
import { useTable, usePagination } from 'react-table';
import { FaEdit, FaTrash, FaClipboard } from 'react-icons/fa';
import "../Styles/Link.css";

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
            toast.success("Link updated");
            fetchLinks();
        } catch (error) {
            console.log(error)
            toast.error("Link not updated!");
        }
    }

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
                Header: 'Date',
                accessor: 'createdAt',
                Cell: ({ value }) => new Date(value).toLocaleDateString(),
            },
            {
                Header: 'Short Link',
                accessor: 'shortLink',
                Cell: ({ value }) => (
                    <div className="short-link-container">
                        <span className="short-link">http://localhost:8000/api/v1/links/r/{value}</span>
                        <button onClick={() => copyToClipboard(value)}><FaClipboard /></button>
                    </div>
                ),
            },
            {
                Header: 'Original Link',
                accessor: 'originalLink',
            },
            {
                Header: 'Remarks',
                accessor: 'remarks',
            },
            {
                Header: 'Clicks',
                accessor: 'clicks',
            },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: ({ value }) => (
                    <span className={`status ${value === 'Active' ? 'active' : 'inactive'}`}>{value}</span>
                ),
            },
            {
                Header: 'Actions',
                Cell: ({ row }) => (
                    <div>
                        <button onClick={() => {
                            setSelectedLink(row.original);
                            setIsModalOpen(true);
                        }}><FaEdit /></button>
                        <button className="delete-btn" onClick={() => {
                            setSelectedLink(row.original);
                            setShowDeleteModal(true);
                        }}><FaTrash /></button>
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
        pageOptions,
        gotoPage,
        previousPage,
        nextPage,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data: filteredLinks,
            initialState: { pageIndex: currentPage - 1 },
            manualPagination: true,
            pageCount: totalPages,
        },
        usePagination
    );

    return (
        <div className="links-container">
            <table className="links-table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Previous
                </button>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </span>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
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
                    message="Are you sure you want to delete this link?"
                    onConfirm={handleDelete}
                    onCancel={() => setShowDeleteModal(false)}
                    isDelete={true}
                />
            )}
        </div>
    );
};

export default Links;
