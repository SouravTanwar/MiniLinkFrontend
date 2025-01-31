import { useState, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { validateEmail, validatePassword } from "../Utils/validation";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
            toast.error(err);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;
