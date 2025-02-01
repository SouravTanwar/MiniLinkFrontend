import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateEditLinkModal.css"
import { format } from "date-fns";
import { validateUrl } from "../Utils/validation";
import { toast } from "react-toastify";

const CreateEditLinkModal = ({ isOpen, onClose, onSave, linkData }) => {
    const [originalLink, setOriginalLink] = useState("");
    const [remarks, setRemarks] = useState("");
    const [expirationEnabled, setExpirationEnabled] = useState(true);
    const [expirationDate, setExpirationDate] = useState(new Date());

    useEffect(() => {
        if (linkData) {
            console.log(linkData)
            setOriginalLink(linkData.originalLink || "");
            setRemarks(linkData.remarks || "");
            setExpirationEnabled(!!linkData.expirationDate);
            setExpirationDate(linkData.expirationDate ? new Date(linkData.expirationDate) : new Date());
        }
    }, [linkData]);

    const handleSave = () => {
        if (!validateUrl(originalLink)){
            toast.error("Use a valid Url (ensure http or https)")
            return
        }

        if(!remarks.trim()){
            toast.error("Please add a remark")
            return
        }

        onSave({
            originalLink,
            remarks,
            expirationDate: expirationEnabled ? format(expirationDate, "yyyy-MM-dd'T'HH:mm:ss'Z'") : null,
        });

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2>{linkData ? "Edit Link" : "Create New Link"}</h2>

                <label>Original Link:</label>
                <input 
                    type="text" 
                    value={originalLink} 
                    onChange={(e) => setOriginalLink(e.target.value)} 
                    placeholder="Enter original URL" 
                />

                <label>Remarks:</label>
                <textarea 
                    value={remarks} 
                    onChange={(e) => setRemarks(e.target.value)} 
                    placeholder="Enter remarks (optional)" 
                />

                <div className="toggle-container">
                    <label>Set Expiration Date:</label>
                    <input 
                        type="checkbox" 
                        checked={expirationEnabled} 
                        onChange={() => setExpirationEnabled(!expirationEnabled)} 
                    />
                </div>

                {expirationEnabled && (
                    <DatePicker
                        selected={expirationDate}
                        onChange={(date) => setExpirationDate(date)}
                        dateFormat="MMM dd, yyyy, hh:mm a"
                        className="date-picker"
                        minDate={new Date()}
                    />
                )}

                <div className="modal-buttons">
                    <button className="save-btn" onClick={handleSave}>
                        {linkData ? "Update" : "Create"}
                    </button>
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CreateEditLinkModal;
