import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaLink, FaChartLine, FaCog } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo"><img src="/Logo.png"/></div>
            <ul className="tabs">
                <li>
                    <NavLink to="/dashboard" activeClassName="active">
                        <FaTachometerAlt className="icon" />
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/links" activeClassName="active">
                        <FaLink className="icon" />
                        Links
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/analytics" activeClassName="active">
                        <FaChartLine className="icon" />
                        Analytics
                    </NavLink>
                </li>
            </ul>
            <div className="separator"></div>
            <ul>
                <li>
                    <NavLink to="/settings" activeClassName="active">
                        <FaCog className="icon" />
                        Settings
                    </NavLink>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
