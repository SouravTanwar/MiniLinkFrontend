import { NavLink } from "react-router-dom";
import "../Styles/Sidebar.css";

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <ul>
                <li>
                    <NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to="/links" activeClassName="active">Links</NavLink>
                </li>
                <li>
                    <NavLink to="/analytics" activeClassName="active">Analytics</NavLink>
                </li>
                <li>
                    <NavLink to="/settings" activeClassName="active">Settings</NavLink>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
