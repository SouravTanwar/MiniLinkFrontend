import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CreateEditLinkModal.css";
import { format, isToday, setHours, setMinutes } from "date-fns";
import { validateUrl } from "../Utils/validation";
import { toast } from "react-toastify";

const CreateEditLinkModal = ({ isOpen, onClose, onSave, linkData }) => {
    const [originalLink, setOriginalLink] = useState("");
    const [remarks, setRemarks] = useState("");
    const [expirationEnabled, setExpirationEnabled] = useState(true);
    const [error, setError] = useState({});

    const getNextDayDate = () => new Date(new Date().setDate(new Date().getDate() + 1));

    const [expirationDate, setExpirationDate] = useState(getNextDayDate);


    useEffect(() => {
        if (linkData) {
            setOriginalLink(linkData.originalLink || "");
            setRemarks(linkData.remarks || "");
            setExpirationEnabled(!!linkData.expirationDate);
            setExpirationDate(linkData.expirationDate ? new Date(linkData.expirationDate) : new Date());
        }
    }, [linkData]);

    const handleSave = () => {
        let errors = {};
        
        if (!validateUrl(originalLink)) {
            toast.error("Use a valid Url (ensure http or https)")
            errors.link = "This field is mandatory";
        }

        if (!remarks.trim()) {
            errors.remarks="This field is mandatory";
        }
        setError(errors);
        if (Object.keys(errors).length > 0) return;

        onSave({
            originalLink,
            remarks,
            expirationDate: expirationEnabled ? format(expirationDate, "yyyy-MM-dd'T'HH:mm:ss'Z'") : null,
        });

        onClose();
    };

    const handleClear = () => {
        setOriginalLink("");
        setRemarks("");
        setExpirationEnabled(true);
        setExpirationDate(getNextDayDate());
        setError({})
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>{linkData ? "Edit Link" : "New Link"}</h2>
                    <button className="cancel-bttn" onClick={onClose}>X</button>
                </div>
                <div className="modal-body">
                    <label>Destination Url <span className="required">*</span></label>
                    <input
                        type="text"
                        value={originalLink}
                        onChange={(e) => setOriginalLink(e.target.value)}
                        placeholder="Enter original URL"
                    />
                    <span className="error-form">{error.link}</span>

                    <label>Remarks <span className="required">*</span></label>
                    <textarea
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        placeholder="Add remarks"
                    />
                    <span className="error-form">{error.remarks}</span>

                    <div className="toggle-container">
                        <label>Link Expiration</label>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={expirationEnabled}
                                onChange={() => setExpirationEnabled(!expirationEnabled)}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>

                    {expirationEnabled && (
                        <DatePicker
                            selected={expirationDate}
                            onChange={(date) => setExpirationDate(date)}
                            dateFormat="MMM dd, yyyy, hh:mm a"
                            showTimeSelect
                            timeFormat="hh:mm aa"
                            timeIntervals={5}
                            minDate={new Date()}
                            minTime={
                                expirationDate && isToday(expirationDate)
                                    ? new Date()
                                    : setHours(setMinutes(new Date(), 0), 0)
                            }
                            maxTime={setHours(setMinutes(new Date(), 59), 23)}
                            className="date-picker"
                        />
                    )}
                </div>
                <div className="modal-buttons">
                    <button className="clear-btn" onClick={handleClear}>
                        Clear
                    </button>
                    <button className="save-btn" onClick={handleSave}>
                        {linkData ? "Save" : "Create new"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateEditLinkModal;
