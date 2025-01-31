import API from "./axiosInstance";

export const updateUser = async (userData) => {
    return await API.patch("/users/update-account", userData);
};

export const deleteUser = async () => {
    return await API.delete("/users/delete-account");
};
