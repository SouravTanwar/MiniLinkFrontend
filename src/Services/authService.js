import API from "./axiosInstance.js";

export const loginUser = async (email, password) => {
    const response = await API.post("/users/login", { email, password });
    return response.data.data;
};

export const signupUser = async (name, email, password, phoneNumber) => {
    const response = await API.post("/users/register", { name, email, password, phoneNumber });
    return response.data.data;
};
