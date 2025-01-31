import { useEffect, useState } from "react";
import { getAnalyticsData } from "../Services/analyticsService";
import { toast } from "react-toastify";
import "../Styles/Analytics.css"

const Analytics = () => {
    const [analytics, setAnalytics] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAnalytics(currentPage);
    }, [currentPage]);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const  data  = await getAnalyticsData(currentPage)
            console.log(data)
            setAnalytics([...data]);
            setTotalPages(data.total); // Adjust as per backend response
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch fuckin analytics data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="analytics-container">
            <h2>Analytics</h2>

            {loading ? <p>Loading...</p> : (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Short Link</th>
                            <th>Original Link</th>
                            <th>IP</th>
                            <th>Device</th>
                        </tr>
                    </thead>
                    <tbody>
                        {analytics.map((entry) => (
                            <tr key={entry._id}>
                                <td>{new Date(entry.createdAt).toLocaleDateString()}</td>
                                <td>{entry.shortLink}</td>
                                <td>{entry.originalLink}</td>
                                <td>{entry.ipAddress}</td>
                                <td>{entry.userAgent}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Pagination Controls */}
            <div className="pagination">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                <span> Page {currentPage} of {totalPages} </span>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </div>
        </div>
    );
};

export default Analytics;
