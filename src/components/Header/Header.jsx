import React, { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import "./Header.scss";
import { useNavigate } from "react-router";
import ChangePassword from "./ChangePassword";


export default function Header() {
  const [open, setOpen] = useState(false);
  const [showChangePwd, setShowChangePwd] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
  Cookies.remove("token");
  navigate("/login");

  };

  return (
    <>
      <header className="header">
        <div className="logo-section">
          <img src="/img/logo1.png" alt="Logo" className="logo" />
          <div className="title">
            <h1>DVDMS</h1>
            <p>Ministry of Health & Family Welfare (Govt. of India)</p>
          </div>
        </div>

        <div className="user-section">
          <span>Welcome, User</span>

          <div
            className="user-wrapper"
            ref={dropdownRef}
            onClick={() => setOpen(!open)}
          >
            <img src="/img/user.png" alt="User" className="user-icon" />

            {open && (
              <div className="dropdown">
                <div
                  className="dropdown-item"
                  onClick={() => {
                    setShowChangePwd(true);
                    setOpen(false);
                  }}
                >
                  Change Password
                </div>

                <div
                  className="dropdown-item logout"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 🔐 Change Password Modal */}
      <ChangePassword
        show={showChangePwd}
        onClose={() => setShowChangePwd(false)}
      />
    </>
  );
}
