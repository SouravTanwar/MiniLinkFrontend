import { useEffect, useState } from "react";
import { getAnalyticsData } from "../Services/analyticsService";
import { toast } from "react-toastify";
import "./Analytics.css"

const Analytics = () => {
    const [analytics, setAnalytics] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAnalytics();
    }, [currentPage]);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const  data  = await getAnalyticsData(currentPage)
            setAnalytics(data.docs);
            setTotalPages(data.totalPages); 
        } catch (error) {
            console.log(error)
            toast.error("Failed to fetch analytics data");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="analytics-container">

            {loading ? <p>Loading...</p> : (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Original Link</th>
                            <th>Short Link</th>
                            <th>IP</th>
                            <th>Device</th>
                        </tr>
                    </thead>
                    <tbody>
                        {analytics.map((entry) => (
                            <tr key={entry._id}>
                                <td>{new Date(entry.createdAt).toLocaleDateString()}</td>
                                <td>{entry.originalLink}</td>
                                <td>https://minilinkbackend.onrender.com/api/v1/links/r/{entry.shortLink}</td>
                                <td>{entry.ipAddress}</td>
                                <td>{entry.userAgent}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Pagination Controls */}
            <div className="pagination">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
                <span> Page {currentPage} of {totalPages} </span>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
            </div>
        </div>
    );
};

export default Analytics;
