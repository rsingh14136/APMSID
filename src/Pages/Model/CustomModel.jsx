import React from "react";
import "../Model/CustomModel.scss";

export default function CustomModel({
  show,
  onClose,
  children,
  title,
  headerIcon = null,     // ✅ NEW
  headerTitle = null,    // ✅ NEW
  width = "720px",
  showFooter = false,
  footerButtons = null
}) {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 🔵 Floating Icon Header */}
        {headerIcon && (
          <div className="modal-icon-circle">
            {headerIcon}
          </div>
        )}

        {/* 🔤 Title below icon */}
        {headerTitle && (
          <h2 className="modal-header-title">{headerTitle}</h2>
        )}

        {/* 🔹 Default title (optional) */}
        {title && <h3 className="modal-title">{title}</h3>}

        <div className="modal-content">{children}</div>

        {showFooter && footerButtons ? (
          <div className="modal-footer">{footerButtons}</div>
        ) : (
          <button className="close-btn universal-close" onClick={onClose}>
            Close
          </button>
        )}
      </div>
    </div>
  );
}
