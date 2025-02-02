import { useEffect, useContext } from "react";
import { DashboardContext } from "../Contexts/DashboardContext";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./Dashboard.css"; 


ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, ChartDataLabels);

const Dashboard = () => {
    const { totalClicks, dateWiseClicks, deviceClicks, fetchAnalytics } = useContext(DashboardContext);

    useEffect(() => {
        fetchAnalytics();
    }, [fetchAnalytics]);


    const dateWiseData = {
        labels: dateWiseClicks?.map((item) => item._id),
        datasets: [
            {
                data: dateWiseClicks?.map((item) => item.cumulativeTotal),
                backgroundColor: "#1B48DA", 
                borderRadius: 1,
                barThickness: 12,
            },
        ],
    };


    const deviceWiseData = {
        labels: deviceClicks?.map((item) => item.deviceType),
        datasets: [
            {
                data: deviceClicks?.map((item) => item.totalClicks),
                backgroundColor: "#1B48DA", 
                borderRadius: 1,
                barThickness: 12, 
            },
        ],
    };


    const chartOptions = {
        animation: { duration: 0 },
        indexAxis: "y",
        layout: {
            padding: {
                right: 40  
            }
        },
        scales: {
            x: {
                display: false,
                grid: { display: false }
            },
            y: {
                display: true,
                grid: { display: false,
                    drawBorder: false,
                color: 'transparent' },
                ticks: {
                    color: "#333",
                    font: { weight: "bold", size: 16 }
                }, 
            }
        },
        plugins: {
            legend: { display: false },
            datalabels: {
                display: true,
                anchor: "end",
                align: "end",
                offset: 10,
                color: "#000",
                font: { weight: "bold", size: 16 },
                formatter: (value) => value,
                clip: false
            },
            tooltip: { enabled: true }
        },
        maintainAspectRatio: false
    };





    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">
                Total Clicks <span className="highlight-text">{totalClicks}</span>
            </h2>
            <div className="charts-grid">
                {/* Date-wise Clicks Chart */}
                <div className="chart-card">
                    <h3 className="chart-title">Date-wise Clicks</h3>
                    <div className="chart-container">
                        {dateWiseClicks?.length > 0 ? (
                            <Bar data={dateWiseData} options={chartOptions} />
                        ) : (
                            <p className="no-data-text">No data available</p>
                        )}
                    </div>
                </div>
                {/* Device-wise Clicks Chart */}
                <div className="chart-card">
                    <h3 className="chart-title">Click Devices</h3>
                    <div className="chart-container">
                        {deviceClicks?.length > 0 ? (
                            <Bar data={deviceWiseData} options={chartOptions} />
                        ) : (
                            <p className="no-data-text">No data available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
