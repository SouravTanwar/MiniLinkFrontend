import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getAnalyticsData } from "../Services/analyticsService";
import { toast } from "react-toastify";
import "./Analytics.css";

const Analytics = () => {
    const [analytics, setAnalytics] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAnalytics(currentPage);
    }, [currentPage]);

    const fetchAnalytics = async (page) => {
        try {
            setLoading(true);
            const data = await getAnalyticsData(page);
            setAnalytics(data.docs);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch analytics data");
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            name: "Timestamp",
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
            style: {
                Width: "140px", 
            },
        },
        {
            name: "Original Link",
            selector: (row) => row.originalLink,
            sortable: false,

            cell: (row) => (
                <div className="fade-text">{row.originalLink}</div>
            ),
        },
        {
            name: "Short Link",
            selector: (row) => `https://minilinkbackend.onrender.com/api/v1/links/r/${row.shortLink}`,
            sortable: false,

            cell: (row) => (
                <div className="fade-text">{`https://minilinkbackend.onrender.com/api/v1/links/r/${row.shortLink}`}</div>
            ),
        },
        {
            name: "IP Address",
            selector: (row) => row.ipAddress,
            sortable: false,
            style: {
                minWidth: "150px", 
            },
        },
        {
            name: "User Device",
            selector: (row) => row.userAgent,
            sortable: false,
        },
    ];
    

    return (
        <div className="analytics-container">
            <DataTable
                columns={columns}
                data={analytics}
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
        </div>
    );
};

export default Analytics;
