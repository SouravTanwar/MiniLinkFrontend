import "./alertModal.css"

const Modal = ({ message, onConfirm, onCancel, isDelete }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <button onClick={onConfirm} className={isDelete ? "delete-btn" : ""}>
                    Yes
                </button>
                <button onClick={onCancel}>No</button>
            </div>
        </div>
    );
};

export default Modal;