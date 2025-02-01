import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import Dashboard from "./Pages/Dashboard";
import Links from "./Pages/Links";
import Analytics from "./Pages/Analytics";
import Settings from "./Pages/Settings";
import { AuthContext } from "./Contexts/AuthContext";
import { useContext } from "react";
import "./App.css";
import PublicLayout from "./Components/Publiclayout";
import ProtectedLayout from "./Components/ProtectedLayout";

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    return user ? (
        <ProtectedLayout>
            {children}
        </ProtectedLayout>
    ) : (
        <Navigate to="/login" />
    );
};

const App = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    return (
        <div className="app-container">
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
                <Route path="/signup" element={<PublicLayout><Signup /></PublicLayout>} />

                {/* Protected Routes */}
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/links" element={<ProtectedRoute><Links /></ProtectedRoute>} />
                <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

                {/* Default Route */}
                <Route path="*" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
            </Routes>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}

export default App;
