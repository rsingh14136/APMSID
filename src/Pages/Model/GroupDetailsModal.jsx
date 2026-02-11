import React from "react";
import { X } from "lucide-react";
import "./GroupDetailsModal.scss";

export default function GroupDetailsModal({ show, onClose, row }) {
  if (!show || !row) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        
        {/* Header */}
        <div className="modals-header">
          <h2>Group Details</h2>
          <button className="close-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modals-body">
          <div className="details-box">
            
            <div className="detail-row">
              <span className="label">Group Name</span>
              <span className="value">{row.name}</span>
            </div>

            <div className="detail-row">
              <span className="label">Category</span>
              <span className="value">{row.category}</span>
            </div>

            <div className="detail-row">
              <span className="label">Effective From</span>
              <span className="value">{row.effectivefrom}</span>
            </div>

            <div className="detail-row">
              <span className="label">Status</span>
              <span
                className={`status ${
                  row.status === "Active" ? "active" : "inactive"
                }`}
              >
                {row.status}
              </span>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="modals-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
