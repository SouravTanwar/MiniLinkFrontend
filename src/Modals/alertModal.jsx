import { useState } from "react";
import Spinner from "../Components/Spinner";
import "./alertModal.css";

const Modal = ({ message, onConfirm, onCancel }) => {
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        setLoading(true);
        await onConfirm();
        setLoading(false);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-modal" onClick={onCancel}>X</span>
                <p>{message}</p>
                <div className="alert-buttons">
                    <button className="cancel-btn" onClick={onCancel} disabled={loading}>No</button>
                    <button onClick={handleConfirm} className="confirm-btn" disabled={loading}>
                        {loading ? <Spinner /> : "Yes"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
