import { createContext, useState, useCallback } from "react";
import { getDateWiseClicks, getDeviceWiseClicks } from "../Services/analyticsService.js";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    const [totalClicks, setTotalClicks] = useState(0);
    const [dateWiseClicks, setDateWiseClicks] = useState([]);
    const [deviceClicks, setDeviceClicks] = useState([]);

    const fetchAnalytics = useCallback(async () => {
        try {
            const dateWiseData = await getDateWiseClicks();
            if (dateWiseData) {
                dateWiseData.sort((a, b) => new Date(b._id) - new Date(a._id));
                setDateWiseClicks([...dateWiseData]);
            }

            const deviceWiseData = await getDeviceWiseClicks();
            if (deviceWiseData) {
                deviceWiseData.sort((a, b) => b.totalClicks - a.totalClicks);
                setDeviceClicks([...deviceWiseData]);
            }

            const clicks = dateWiseData.length === 0 ? 0 : dateWiseData[0].cumulativeTotal;
            setTotalClicks(clicks);

        } catch (error) {
            console.error("Error fetching analytics:", error);
        }
    }, []);

    return (
        <DashboardContext.Provider value={{ totalClicks, dateWiseClicks, deviceClicks, fetchAnalytics }}>
            {children}
        </DashboardContext.Provider>
    );
};

