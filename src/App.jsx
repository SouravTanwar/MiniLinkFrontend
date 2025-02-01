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

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    return user ? (
        <div className="protected-container">
            <Sidebar />
            <main className="main-content">{children}</main>
        </div>
    ) : (
        <Navigate to="/login" />
    );
};

function App() {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    return (
        <div className="app-container">
            {user && <Sidebar />} {/* Sidebar fixed on the left */}

            {user && <Navbar />} {/* Navbar fixed at the top */}

            <div className="main-section">
                <Routes>
                    {/* Protected Routes (With Sidebar and Navbar) */}
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/links" element={<ProtectedRoute><Links /></ProtectedRoute>} />
                    <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
                    <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

                    {/* Public Routes (No Sidebar, No Navbar) */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Default Route - Redirect to Dashboard if logged in, otherwise Login */}
                    <Route path="*" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                </Routes>
            </div>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}

export default App;
