import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { SearchContext } from "../Contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaPlusCircle, FaSearch } from "react-icons/fa";
import "./Navbar.css"; 
import { toast } from "react-toastify";
import CreateEditLinkModal from "../Modals/CreateEditLinkModal";
import { createLink } from "../Services/linksService";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { searchTerm, setSearchTerm } = useContext(SearchContext);
    const navigate = useNavigate();
    const [timeGreeting, setTimeGreeting] = useState("");
    const [date, setDate] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) setTimeGreeting("🌄Good Morning");
        else if (currentHour < 16) setTimeGreeting("🌞Good Afternoon");
        else if (currentHour < 20) setTimeGreeting("🌇Good Evening");
        else setTimeGreeting("🌃Good Night");
    }, []);


    useEffect(() => {
        const today = new Date();
        const options = { weekday: "short", month: "short", day: "numeric" };
        setDate(today.toLocaleDateString("en-US", options));
    }, []);


    useEffect(() => {
        if (searchTerm.trim()) {
            navigate(`/links?search=${searchTerm}`);
        }
    }, [searchTerm, navigate]);

    const handleCreateNewLink = async (data) => {
        try {
            await createLink(data);
            toast.success("Link created");
            navigate("/links");
        
        } catch (error) {
            console.log(error)
            toast.error("Link not created!");
        }
    };


    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h2>{timeGreeting}, {user?.name || "User"}</h2>
                <p>{date}</p>
            </div>

            <div className="navbar-center">
                <button className="create-btn" onClick={() => setIsModalOpen(true)}>
                    <FaPlusCircle /> Create New
                </button>
                <form className="search-form">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search Remarks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
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

            <CreateEditLinkModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSave={(newLinkData) => {handleCreateNewLink(newLinkData)}}
            />
        </nav>
    );
};

export default Navbar;
