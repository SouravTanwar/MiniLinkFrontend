import API from "./axiosInstance";

// Get paginated links
export const getLinks = async (page = 1) => {
    const response = await API.get(`/links/user-links?page=${page}`);
    return response.data.data;
};

// Delete a link
export const deleteLink = async (linkId) => {
    const response = await API.delete(`/links/delete/${linkId}`);
    return response.data.data;
};
