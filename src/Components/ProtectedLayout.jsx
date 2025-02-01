import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import "./ProtectedLayout.css"; 

const ProtectedLayout = ({ children }) => {
    return (
        <div className="protected-container">
            <Sidebar />
            <Navbar />
            <main className="main-content">
                {children}
            </main>
        </div>
    );
};

export default ProtectedLayout;
