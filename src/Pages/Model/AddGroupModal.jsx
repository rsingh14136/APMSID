import React, { useState, useEffect } from "react";
import "./AddGroupModal.scss";

export default function AddGroupModal({ show, onClose, onAdd, formData }) {
  const [groupName, setGroupName] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("1"); // 1 = Active, 0 = Inactive

  // ---------- Edit / Prefill Support ----------
  useEffect(() => {
    if (formData) {
      setGroupName(formData.strGroupName || "");
      setCategory(formData.strItemCatId || "");
      setStatus(formData.strIsValid ?? "1");

      // Convert DD-MM-YYYY → YYYY-MM-DD for date input
      if (formData.strEffectiveFrom) {
        const [d, m, y] = formData.strEffectiveFrom.split("-");
        setDate(`${y}-${m}-${d}`);
      }
    }
  }, [formData]);

  if (!show) return null;

  // ---------- Date Formatter for Backend ----------
  const formatDateForBackend = (isoDate) => {
    if (!isoDate) return "";
    const [y, m, d] = isoDate.split("-");
    return `${d}-${m}-${y}`;
  };
const isValidGroupName = (name) => {
  return /^[A-Za-z ]+$/.test(name);
};
  // ---------- Submit ----------
  const handleSubmit = () => {
    if (!groupName.trim()) return alert("Group Name is required");
     if (!isValidGroupName(groupName.trim())) {
    return alert("Group Name must contain only alphabets and spaces");
  }
    if (!category) return alert("Category is required");
    if (!date) return alert("Effective Date is required");

    onAdd({
      strGroupName: groupName.trim(),
      strItemCatId: category,
      strEffectiveFrom: formatDateForBackend(date),
      strIsValid: status
    });

    // Reset
    setGroupName("");
    setCategory("");
    setDate("");
    setStatus("1");

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>

        {/* ===== Header ===== */}
        <div className="modals-header">
          <h2>{formData ? "Edit Group" : "Add New Group"}</h2>
          <button className="close-icon" onClick={onClose}>✕</button>
        </div>

        {/* ===== Body ===== */}
        <div className="modals-body">
          <div className="add-group-form">

            <div className="form-row">
              <div className="form-group">
                <label>Group Name</label>
              <input
  value={groupName}
  onChange={(e) => {
    const value = e.target.value;

    // Allow only letters & space
    if (/^[A-Za-z ]*$/.test(value)) {
      setGroupName(value);
    }
  }}
  placeholder="Enter group name"
/>

              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">-- Select Category --</option>
                  {formData?.categoryList?.map(item => (
                    <option
                      key={item.strItemCatId}
                      value={item.strItemCatId}
                    >
                      {item.strItemName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Effective Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* ===== Footer ===== */}
        <div className="modals-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSubmit}>
            {formData ? "Add Group" : "Add Group"}
          </button>
        </div>

      </div>
    </div>
  );
}
