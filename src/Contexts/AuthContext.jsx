import { createContext, useState, useEffect } from "react";
import { loginUser, signupUser } from "../Services/authService";
import API from "../Services/axiosInstance";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkUserSession = async () => {
        try {
            const { data } = await API.get("/users/user-account");
            setUser(data.data);
        } catch (error) {
            setUser(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        checkUserSession();
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                await API.get("/users/refresh-token");
            } catch (error) {
                setUser(null);
            }
        }, 65 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    const login = async (email, password) => {
        try {
            const data = await loginUser(email, password);
            setUser(data.user);
            toast.success("Login successful!");
        } catch (error) {
            toast.error("Invalid Credentials");
        }
    };

    const signup = async (name, email, password, phoneNumber) => {
        try {
            const data = await signupUser(name, email, password, phoneNumber);
            setUser(data.user);
            toast.success("Signup successful!");
        } catch (error) {
            toast.error("Signup failed!");
        }
    };

    const logout = async () => {
        try {
            await API.post("/users/logout");
            setUser(null);
            toast.info("Logged out successfully!");
        } catch (error) {
            toast.error("Logout failed!");
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
