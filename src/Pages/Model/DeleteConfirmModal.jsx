import React from "react";
import "./DeleteConfirmModal.scss";

export default function DeleteConfirmModal({ show, onClose, onConfirm, row }) {
  if (!show) return null;

  return (
    <div className="confirm-overlay" onClick={onClose}>
      {/* Prevent modal from closing when clicking inside */}
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>

        {/* Trash Icon */}
        <div className="icon-wrapper">
          <div className="icon-circle">
            <span role="img" aria-label="trash">🗑️</span>
          </div>
          <div className="dot dot-1"></div>
          <div className="dot dot-2"></div>
        </div>

        {/* Modal Text */}
        <div className="modal-content">
          <h2 className="modal-title">
            Are you sure you want to delete <br /> <b>{row?.name}</b>?
          </h2>
        </div>

        {/* Buttons */}
        <div className="confirm-actions">
          <button className="btn btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-delete"
            onClick={() => {
              if (onConfirm) {
                onConfirm(); // triggers delete in parent
              }
              onClose(); // close modal after confirming
            }}
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}
