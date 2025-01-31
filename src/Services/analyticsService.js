import axios from "axios";

export const getDateWiseClicks = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/analytics/date-wise-clicks", { withCredentials: true });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching date-wise clicks:", error);
        return null;
    }
};

export const getDeviceWiseClicks = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/analytics/device-wise-clicks", { withCredentials: true });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching device-wise clicks:", error);
        return null;
    }
};

