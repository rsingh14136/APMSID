import React, { useState, useEffect } from "react";
import "./EditGroupModal.scss";
import { useRecoilValue } from "recoil";
import { categoryListState } from "../../recoil/groupState";
import { toast } from "react-toastify";


export default function EditGroupModal({ show, onClose, rowData, onSave }) {

  const categoryList = useRecoilValue(categoryListState);

  
  const [form, setForm] = useState({
    name: "",
    categoryId: "",
    effectivefrom: "",
    status: ""
  });

  useEffect(() => {
    if (rowData) {
      setForm({
        name: rowData.name || "",
        categoryId: rowData.catId ? String(rowData.catId) : "",
        effectivefrom: rowData.effectivefrom || "",
   status: rowData.status === "Active" ? "1" : "0"
      });
    }
  }, [rowData]);

  if (!show) return null;
  const isValidGroupName = (value) => /^[A-Za-z ]*$/.test(value);


  const handleChange = (e) => {
    const { name, value } = e.target;

  // Validate group name: only letters & spaces
  if (name === "name" && !isValidGroupName(value)) {
    return;
  }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSave = () => {
  if (!form.name.trim()) {
    toast.error("Group Name is required");
    return;
  }

  if (!/^[A-Za-z ]+$/.test(form.name.trim())) {
    toast.error("Group Name must contain only alphabets and spaces");
    return;
  }
onClose();  
  onSave(form);
};



  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ===== HEADER ===== */}
        <div className="modals-header">
          <h2>Modify Group</h2>
          <button className="close-icon" onClick={onClose}>✕</button>
        </div>

        {/* ===== BODY ===== */}
        <div className="modals-body">
          <div className="edit-group-form">

            <div className="form-row">
              <div className="form-group">
                <label>Group Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
    name="categoryId"
    value={form.categoryId}
    onChange={handleChange}
  >
    <option value="">-- Select Category --</option>

    {categoryList.map(cat => (
      <option key={cat.id} value={cat.id}>
        {cat.name}
      </option>
    ))}
  </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Effective From</label>
                <input
                  type="date"
                  name="effectivefrom"
                  value={form.effectivefrom}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select name="status" value={form.status} onChange={handleChange}>
  <option value="1">Active</option>
  <option value="0">Inactive</option>
</select>

              </div>
            </div>

          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <div className="modals-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
