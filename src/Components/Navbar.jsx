import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../Styles/Navbar.css"; // Using Vanilla CSS
import { toast } from "react-toastify";

const Navbar = ({ openModal }) => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [timeGreeting, setTimeGreeting] = useState("");
    const [date, setDate] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Get current time-based greeting
    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) setTimeGreeting("Good Morning");
        else if (currentHour < 18) setTimeGreeting("Good Afternoon");
        else setTimeGreeting("Good Evening");
    }, []);

    // Get current date
    useEffect(() => {
        const today = new Date();
        const options = { weekday: "short", month: "short", day: "numeric" };
        setDate(today.toLocaleDateString("en-US", options));
    }, []);

    // Handle search input
    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            toast.error("Enter a remark to search.");
            return;
        }
        navigate(`/links?search=${searchTerm}`);
    };

    // Logout function
    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h2>{timeGreeting}, {user?.name || "User"}!</h2>
                <p>{date}</p>
            </div>

            <div className="navbar-center">
                <button className="create-btn" onClick={() => navigate("/links", { state: { openModal: true } })}>
                    Create New
                </button>
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Search Remarks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit">🔍</button>
                </form>
            </div>

            <div className="navbar-right">
                <div className="user-dropdown" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <span className="user-initials">
                        {user?.name ? user.name.slice(0, 2).toUpperCase() : "U"}
                    </span>
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
