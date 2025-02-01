import { useState, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { validateEmail, validatePassword } from "../Utils/validation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email) || !validatePassword(password)) {
            setError("Invalid email or password");
            return;
        }
        
        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleSignup = () => {
        navigate("/signup");
    };

    return (
        <div className="login-page">
            <div className="login-left">
                <div className="login-logo"><img src = '/Logo.png' /></div>
            </div>
            <div className="login-right">
                <div className="login-header">
                    <button className="login-nav-btn active">Login</button>
                    <button className="login-nav-btn" onClick={handleSignup}>SignUp</button>
                </div>
                <div className="login-container">
                    <h2 className="login-title">Welcome Back!</h2>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <input type="email" placeholder="Email id" value={email} onChange={(e) => setEmail(e.target.value)} className="login-input" />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" />
                        <button type="submit" className="login-button">Login</button>
                    </form>
                    {error && <p className="login-error">{error}</p>}
                    <p className="login-signup-link">Don't have an account? <span onClick={handleSignup}>SignUp</span></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
