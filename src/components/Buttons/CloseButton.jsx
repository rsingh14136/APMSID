import React from "react";
import { useNavigate } from "react-router-dom";
import "./CloseButton.scss";

export default function CloseButton({ to }) {
  const navigate = useNavigate();

  const handleClose = () => {
    if (to) {
      navigate(to);       // go to specific route
    } else {
      navigate(-1);       // go back
    }
  };

  return (
    <button
      className="close-button"
      onClick={handleClose}
      aria-label="Close"
    >
      ✖
    </button>
  );
}
