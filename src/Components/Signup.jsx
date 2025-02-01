import { useState, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { toast } from "react-toastify";
import { validateEmail, validatePassword, validateName, validatePhone } from "../Utils/validation";
import { useNavigate } from "react-router-dom";
import "./Signup.css";  // Import the CSS file

const Signup = () => {
    const { signup } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateName(name) || !validateEmail(email) || !validatePassword(password, confirmPassword) || !validatePhone(phoneNumber)) {
            setError("Invalid input fields");
            return;
        }
        try {
            await signup(name, email, password, phoneNumber);
            navigate("/login");
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <div className="signup-page">
            <div className="signup-left">
                <div className="signup-logo"><img src = '/Logo.png' /></div>
            </div>
            <div className="signup-right">
                <div className="signup-header">
                    <button className="signup-nav-btn" onClick={handleLogin}>Login</button>
                    <button className="signup-nav-btn active">SignUp</button>
                </div>
                <div className="signup-container">
                    <h2 className="signup-title">Join us Today!</h2>
                    <form className="signup-form" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="signup-input" />
                        <input type="email" placeholder="Email id" value={email} onChange={(e) => setEmail(e.target.value)} className="signup-input" />
                        <input type="tel" placeholder="Mobile no." value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="signup-input" />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="signup-input" />
                        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="signup-input" />
                        <button type="submit" className="signup-button">Register</button>
                    </form>
                    {error && <p className="signup-error">{error}</p>}
                    <p className="signup-login-link">Already have an account? <span onClick={handleLogin}>Login</span></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
