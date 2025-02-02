import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <img src="/Logo.png" alt="Logo" />
            </div>
            <ul className="tabs">
                <li>
                    <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
                        <img src="/Dashboard.svg" alt="Dashboard Icon" className="icon" />
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/links" className={({ isActive }) => (isActive ? "active" : "")}>
                        <img src="/links.svg" alt="Links Icon" className="icon" />
                        Links
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/analytics" className={({ isActive }) => (isActive ? "active" : "")}>
                        <img src="/analytics.svg" alt="Analytics Icon" className="icon" />
                        Analytics
                    </NavLink>
                </li>
            </ul>
            <ul className="setting-tab">
                <li>
                    <NavLink to="/settings" className={({ isActive }) => (isActive ? "active" : "")}>
                        <img src="/Settings.svg" alt="Settings Icon" className="icon" />
                        Settings
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
