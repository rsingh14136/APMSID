import React from "react";
import { Loader2 } from "lucide-react";
import "../Buttons/Buttons.scss";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  className = "",
  disabled = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  ...props
}) {
  return (
    <button
      className={`btn ${variant} ${size} ${fullWidth ? "fullWidth" : ""} ${
        disabled || loading ? "disabled" : ""
      } ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="left-icon animate-spin" />}

      {!loading && LeftIcon && <LeftIcon className="left-icon" />}

      {children}

      {!loading && RightIcon && <RightIcon className="right-icon" />}
    </button>
  );
}
