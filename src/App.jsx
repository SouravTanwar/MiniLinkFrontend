import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Pages/Dashboard";
import { AuthProvider, AuthContext } from "./Contexts/AuthContext";
import { DashboardProvider } from "./Contexts/DashboardContext";
import { useContext } from "react";

// const PrivateRoute = ({ children }) => {
//     const { user } = useContext(AuthContext);
//     return user ? children : <Navigate to="/login" />;
// };


const App = () => {
    return (
        <AuthProvider>
            <DashboardProvider>
                <Router>
                    <ToastContainer position="top-right" autoClose={3000} />
                    <Routes>
                        {/* <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        {/* <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}
                    </Routes>
                </Router>
            </DashboardProvider>
        </AuthProvider>
    );
};

export default App;


