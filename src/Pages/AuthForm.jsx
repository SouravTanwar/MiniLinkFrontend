import { useState, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
    validateEmail,
    validatePassword,
    validateName,
    validatePhone,
    confirmPasswordMatch,
} from "../Utils/validation";
import "./AuthForm.css";
import Spinner from "../Components/Spinner"; // Import the Spinner component

const AuthForm = ({ isSignup }) => {
    const { signup, login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = {};

        if (isSignup) {
            if (!validateName(name)) {
                errors.name = "Enter a valid name";
            }
            if (!validatePhone(phoneNumber)) {
                errors.phoneNumber = "Enter a valid phone number";
            }
            if (!confirmPasswordMatch(password, confirmPassword)) {
                errors.confirmPassword = "Passwords do not match.";
            }
        }

        if (!validateEmail(email)) {
            errors.email = "Invalid email";
        }
        if (!validatePassword(password)) {
            errors.password = "Password needs 6+ characters with letters and digits.";
        }

        setError(errors);
        if (Object.keys(errors).length > 0) return;

        setLoading(true);
        try {
            if (isSignup) {
                await signup(name, email, password, phoneNumber);
                navigate("/login");
            } else {
                await login(email, password);
                navigate("/dashboard");
            }
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-left">
                <div className="auth-logo">
                    <img src="/Logo.png" alt="Logo" />
                </div>
            </div>
            <div className="auth-right">
                <div className="auth-header">
                    <button
                        className={`auth-nav-btn ${isSignup ? "active" : ""}`}
                        onClick={() => navigate("/signup")}
                    >
                        SignUp
                    </button>
                    <button
                        className={`auth-nav-btn ${!isSignup ? "active" : ""}`}
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </button>
                </div>
                <div className="auth-container">
                    <h2 className="auth-title">{isSignup ? "Join us Today!" : "Login"}</h2>
                    <form className="auth-form" onSubmit={handleSubmit}>
                        {isSignup && (
                            <>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="auth-input"
                                />
                                <span className="error-input">{error.name}</span>
                            </>
                        )}

                        <input
                            type="email"
                            placeholder="Email id"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="auth-input"
                        />
                        <span className="error-input">{error.email}</span>

                        {isSignup && (
                            <>
                                <input
                                    type="tel"
                                    placeholder="Mobile no."
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="auth-input"
                                />
                                <span className="error-input">{error.phoneNumber}</span>
                            </>
                        )}

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="auth-input"
                        />
                        <span className="error-input">{error.password}</span>

                        {isSignup && (
                            <>
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="auth-input"
                                />
                                <span className="error-input">{error.confirmPassword}</span>
                            </>
                        )}

                        <button type="submit" className="auth-button" disabled={loading}>
                            {loading ? <Spinner /> : isSignup ? "Register" : "Login"}
                        </button>
                    </form>
                    <p className="auth-toggle-link">
                        {isSignup ? "Already have an account? " : "Don't have an account? "}
                        <span onClick={() => navigate(isSignup ? "/login" : "/signup")}>
                            {isSignup ? "Login" : "SignUp"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
