import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { updateUser, deleteUser } from "../Services/settingService";
import Modal from "../Modals/alertModal";
import { toast } from "react-toastify";
import { validateEmail, validateName, validatePhone } from "../Utils/validation";
import "./Settings.css"; 

const Settings = () => {
    const { user } = useContext(AuthContext); 
    const navigate = useNavigate();

    const initialFormData = {
        name: user?.name || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [isChanged, setIsChanged] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => {
            const newFormData = { ...prevFormData, [name]: value };
            setIsChanged(JSON.stringify(newFormData) !== JSON.stringify(initialFormData));
            return newFormData;
        });
    };

    const handleCheckSave = async () => {
        if (!isChanged) {
            toast.error("No changes to save.");
            return;
        }

        if (!validateName(formData.name) || !validateEmail(formData.email) || !validatePhone(formData.phoneNumber)) {
            toast.error("Invalid input fields");
            return;
        }
        setShowUpdateModal(true);
    };

    const handleUpdate = async () => {
        try {
            await updateUser(formData); 
            toast.success("Profile updated successfully! Please Login Again");
            setShowUpdateModal(false); 
            navigate("/login");
            
        } catch (error) {
            console.log(error);
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
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Email id</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Mobile no.</label>
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </div>
            <div className="settings-buttons">
                <button className="save-button" onClick={handleCheckSave}>Save Changes</button>
                <button className="delete-button" onClick={() => setShowDeleteModal(true)}>Delete Account</button>
            </div>

            {showUpdateModal && (
                <Modal
                    message="Are you sure you want to update your details?"
                    onConfirm={handleUpdate}
                    onCancel={() => setShowUpdateModal(false)}
                />
            )}

            {showDeleteModal && (
                <Modal
                    message="Are you sure you want to delete the account?"
                    onConfirm={handleDelete}
                    onCancel={() => setShowDeleteModal(false)}
                />
            )}
        </div>
    );
};

export default Settings;
