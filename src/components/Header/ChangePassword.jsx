import React, { useState } from "react";
import { FaKey } from "react-icons/fa";
import CustomModel from "../../Pages/Model/CustomModel";
import "./ChangePassword.scss";

/* 🔐 Password policy regex */
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,16}$/;

/* 📊 Password strength logic */
const getPasswordStrength = (password) => {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[@$!%*?&#]/.test(password)) score++;

  if (score <= 2) return { label: "Weak", level: 1 };
  if (score === 3 || score === 4) return { label: "Medium", level: 2 };
  return { label: "Strong", level: 3 };
};

export default function ChangePassword({ show, onClose }) {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const strength = getPasswordStrength(form.newPassword);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setForm({
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  const handleClose = () => {
    handleClear();
    onClose();
  };

  const handleSave = () => {
    const { oldPassword, newPassword, confirmPassword } = form;

    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (oldPassword === newPassword) {
      alert("New password must be different from old password");
      return;
    }

    if (newPassword.includes(" ")) {
      alert("Password must not contain spaces");
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      alert(
        "Password must be 8–16 characters and include uppercase, lowercase, number, and special character"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New Password and Confirm Password do not match");
      return;
    }

    if (strength.level < 3) {
      alert("Password is not strong enough");
      return;
    }

    console.log("Change Password:", form);
    alert("Password changed successfully");

    handleClear();
    onClose();
  };

  const footerButtons = (
    <>
      <button className="btn save" onClick={handleSave}>Save</button>
      <button className="btn clear" onClick={handleClear}>Clear</button>
      <button className="btn cancel" onClick={handleClose}>Cancel</button>
    </>
  );

  return (
    <CustomModel
      show={show}
      onClose={handleClose}
      width="520px"
      showFooter={true}
      footerButtons={footerButtons}
      title="Change Password"     /* ✅ Clean title */
      headerIcon={<FaKey />}            /* ✅ Floating centered icon */
    >
      <div className="change-password-form">
        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          value={form.oldPassword}
          onChange={handleChange}
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
        />

        {/* 🔎 Password rules */}
        <div className="password-note">
          Password must contain (
          <span className={/[A-Z]/.test(form.newPassword) ? "ok" : "error"}>Uppercase</span>,
          <span className={/[a-z]/.test(form.newPassword) ? "ok" : "error"}> Lowercase</span>,
          <span className={/[0-9]/.test(form.newPassword) ? "ok" : "error"}> Number</span>,
          <span className={/[@$!%*?&#]/.test(form.newPassword) ? "ok" : "error"}> Special</span>,
          <span className={form.newPassword.length >= 8 && form.newPassword.length <= 16 ? "ok" : "error"}>
            {" "}8–16 chars
          </span>,
          <span className={!/\s/.test(form.newPassword) ? "ok" : "error"}> No spaces</span>,
          <span className={form.oldPassword && form.newPassword && form.oldPassword !== form.newPassword ? "ok" : "error"}>
            {" "}Different from old password
          </span>
          )
        </div>

        {/* 📊 Strength meter */}
        {form.newPassword && (
          <div className="strength-meter">
            <div className={`bar level-${strength.level}`}>
              <span className="emoji">
                {strength.level === 1 && "😟"}
                {strength.level === 2 && "😐"}
                {strength.level === 3 && "😎"}
              </span>
            </div>
            <span className={`label ${strength.label.toLowerCase()}`}>
              {strength.label}
            </span>
          </div>
        )}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />
      </div>
    </CustomModel>
  );
}
