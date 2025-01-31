import { createContext, useState } from "react";
import { getDateWiseClicks, getDeviceWiseClicks } from "../Services/analyticsService.js";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    const [totalClicks, setTotalClicks] = useState(0);
    const [dateWiseClicks, setDateWiseClicks] = useState([]);
    const [deviceClicks, setDeviceClicks] = useState([]);

    const fetchAnalytics = async () => {
        try {
            // Fetch data for date-wise clicks
            const dateWiseData = await getDateWiseClicks();
            if (dateWiseData) {
                setDateWiseClicks([...dateWiseData]);
            }
    
            // Fetch data for device-wise clicks
            const deviceWiseData = await getDeviceWiseClicks();
            if (deviceWiseData) {
                setDeviceClicks([...deviceWiseData]);
            }

            const clicks = dateWiseData.length === 0 ? 0 : dateWiseData.sort((a, b) => new Date(b.date) - new Date(a.date))[0].totalClicks;
            setTotalClicks(clicks);


        } catch (error) {
            console.error("Error fetching analytics:", error);
        }
    };

    return (
        <DashboardContext.Provider value={{ totalClicks, dateWiseClicks, deviceClicks, fetchAnalytics }}>
            {children}
        </DashboardContext.Provider>
    );
};

// export const useDashboardContext = () => useContext(DashboardContext);
