import React from "react";
import { CheckCircle, X } from "lucide-react";
import "./SuccessModal.scss";

export default function SuccessModal({
  open,
  title,
  message,
  onClose
}) {
  if (!open) return null;

  return (
    <div className="success-overlay" onClick={onClose}>
      <div
        className="success-box"
        onClick={(e) => e.stopPropagation()}
      >
        <X className="success-close" onClick={onClose} />

        <div className="success-icon">
          <CheckCircle size={60} />
        </div>

        <h2>{title}</h2>
        <p>{message}</p>

        <button className="success-action" onClick={onClose}>
          Awesome!
        </button>
      </div>
    </div>
  );
}
