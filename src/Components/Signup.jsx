import { useState, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { toast } from "react-toastify";
import { validateEmail, validatePassword, validateName, validatePhone} from "../Utils/validation";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const { signup } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState();
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
            toast.error(err);
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="tel" placeholder="Mobile" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value) }></input>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <button type="submit">Signup</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Signup;
