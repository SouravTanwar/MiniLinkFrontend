import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { updateUser, deleteUser } from "../Services/settingService";
import Modal from "../Modals/alertModal";
import { toast } from "react-toastify";
import { validateEmail,validateName , validatePhone } from "../Utils/validation";
import "./Settings.css"; 

const Settings = () => {
    const { user } = useContext(AuthContext); 
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckSave = async () => {
        if (!validateName(formData.name) || !validateEmail(formData.email) || !validatePhone(formData.phoneNumber)) {
            toast.error("Invalid input fields");
            return;
        }
        setShowUpdateModal(true)
    }


    const handleUpdate = async () => {
        try {
            await updateUser(formData); 
            toast.success("Profile updated successfully! Please Login Again");
            setShowUpdateModal(false); 
            navigate("/login");
            
        } catch (error) {
            console.log(error)
            toast.error("Update failed!");
        }
    };

    const handleDelete = async () => {
        try {
            await deleteUser(); 
            toast.success("Account deleted successfully! Please Login Again");
            setShowDeleteModal(false);
            navigate("/login");
        } catch (error) {
            toast.error("Deletion failed!");
        }
    };

    
    return (
        <div className="settings-container">
            <div className="form-group">
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Mobile:</label>
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </div>
            <button className="save-button" onClick={handleCheckSave}>Save Changes</button>
            <button className="delete-button" onClick={() => setShowDeleteModal(true)}>Delete Account</button>
    
            {/* Update Confirmation Modal */}
            {showUpdateModal && (
                <Modal
                    message="Are you sure you want to update your details?"
                    onConfirm={handleUpdate}
                    onCancel={() => setShowUpdateModal(false)}
                    isDelete={false}
                />
            )}
    
            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <Modal
                    message="Are you sure you want to delete the account?"
                    onConfirm={handleDelete}
                    onCancel={() => setShowDeleteModal(false)}
                    isDelete={true}
                />
            )}
        </div>
    );
    

    

};

export default Settings;
