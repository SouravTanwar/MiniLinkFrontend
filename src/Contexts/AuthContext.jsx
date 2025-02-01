import { createContext, useState, useEffect } from "react";
import { loginUser, signupUser } from "../Services/authService";
import API from "../Services/axiosInstance";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to fetch user session (on app load)
    const checkUserSession = async () => {
        try {
            const { data } = await API.get("/users/user-account"); // Backend provides user data
            setUser(data.data);
        } catch (error) {
            setUser(null);
        }
        setLoading(null)
    };

    useEffect(() => {
        checkUserSession();
    }, []);

    // Refresh token every 60 minutes
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                await API.get("/users/refresh-token"); // Calls backend refresh endpoint
            } catch (error) {
                setUser(null);
            }
        }, 65 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    // Login function
    const login = async (email, password) => {
        try {
            const data = await loginUser(email, password);
            setUser(data.user);
            toast.success("Login successful!");
        } catch (error) {
            toast.error("Login failed!");
        }
    };

    // Signup function
    const signup = async (name, email, password, phoneNumber) => {
        try {
            const data = await signupUser(name, email, password, phoneNumber);
            setUser(data.user);
            console.log("AutCon-signin_user1")
            toast.success("Signup successful!");
        } catch (error) {
            toast.error("Signup failed!");
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await API.post("/users/logout");
            setUser(null);
            console.log("AutCon-logout_user1")
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
