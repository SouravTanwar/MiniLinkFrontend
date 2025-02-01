import API from "./axiosInstance";


export const getLinks = async (page = 1) => {
    const response = await API.get(`/links/user-links?page=${page}`);
    return response.data.data;
};


export const deleteLink = async (linkId) => {
    console.log(linkId)
    const response = await API.delete(`/links/delete/${linkId}`);
    return response.data.data;
};

export const createLink = async (data) => {
    return await API.post("/links/create-link",data)
}

export const updateLink = async (linkID,data) => {
    console.log(linkID)
    console.log(data)
    return await API.patch(`/links/update/${linkID}`, data);
};