import { useEffect, useContext } from "react";
import { DashboardContext } from "../Contexts/DashboardContext"
const Dashboard = () => {
    const { totalClicks, dateWiseClicks, deviceClicks, fetchAnalytics } = useContext(DashboardContext);
    
    useEffect(() => {
        fetchAnalytics();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold">
                Total Clicks <span className="text-blue-600">{totalClicks}</span>
            </h2>

            <div className="grid grid-cols-2 gap-6 mt-4">
                {/* Date-wise Clicks */}
                <div className="border p-4 rounded-lg">
                    <h3 className="font-semibold">Date-wise Clicks</h3>
                    {dateWiseClicks?.length > 0 ? (
                        dateWiseClicks.map(({ _id, cumulativeTotal }) => (
                                <div
                                    key={_id}
                                    className="flex justify-between items-center mt-2"
                                >
                                    <span>{_id}</span> 
                                    
                                    <span>------ {cumulativeTotal}</span>
                                </div>
                            )
                        )
                    ) : (
                        <p className="text-gray-500">No data available</p>
                    )}
                </div>

                {/* Device-wise Clicks */}
                <div className="border p-4 rounded-lg">
                    <h3 className="font-semibold">Click Devices</h3>
                    {deviceClicks?.length > 0 ? (
                        deviceClicks.map(({ deviceType, totalClicks }) => ( 
                            <div key={deviceType} className="flex justify-between items-center mt-2">
                                <span>{deviceType}</span>
                                
                                <span>---------- {totalClicks}</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No data available</p>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
