import API from "./axiosInstance";

export const getDateWiseClicks = async () => {
    try {
        const response = await API.get("analytics/date-wise-clicks");
        return response.data.data;
    } catch (error) {
        console.error("Error fetching date-wise clicks:", error);
        return null;
    }
};

export const getDeviceWiseClicks = async () => {
    try {
        const response = await API.get("/analytics/device-wise-clicks");
        return response.data.data;
    } catch (error) {
        console.error("Error fetching device-wise clicks:", error);
        return null;
    }
};

export const getAnalyticsData = async (page = 1) => {
    try {
        const { data } = await API.get(`/analytics/link-analytics`);
        console.log(data.data)
        return data.data;
    } catch (error) {
        throw error;
    }
};

