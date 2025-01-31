import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/login" />;
};


function App() {
    const { user } = useContext(AuthContext);

    return (
        <div className="app-container">
            <ToastContainer position="top-right" autoClose={3000} />
            {user && <Navbar />}
            {user && <Sidebar />}
            <main className="main-content">
                <Routes>
                    {/* Protected Routes (Only accessible if logged in) */}
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/links" element={<ProtectedRoute><Links /></ProtectedRoute>} />
                    <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
                    <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

                    {/* Public Routes (Accessible without login) */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Default Route - Redirect to Dashboard if logged in, otherwise Signup */}
                    <Route path="*" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;


