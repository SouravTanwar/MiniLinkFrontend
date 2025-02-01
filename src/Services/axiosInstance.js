import axios from "axios";

const API = axios.create({
    baseURL: "https://minilinkbackend.onrender.com/api/v1",
    withCredentials: true,
});

export default API;
