import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  fullWidth = false,
  variant = "primary", 
  size = "medium", 
  style: customStyle = {},
}) => {
  const baseStyles = {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "500",
    borderRadius: "6px",
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.3s ease",
    width: fullWidth ? "100%" : "auto",
    display: "inline-block",
  };

  const variants = {
    primary: {
      backgroundColor: "#007BFF",
      color: "#fff",
    },
    secondary: {
      backgroundColor: "#6c757d",
      color: "#fff",
    },
    danger: {
      backgroundColor: "#dc3545",
      color: "#fff",
    },
  };

  const sizes = {
    small: { fontSize: "14px", padding: "6px 12px" },
    medium: { fontSize: "16px", padding: "10px 20px" },
    large: { fontSize: "18px", padding: "14px 28px" },
  };

  const combinedStyles = {
    ...baseStyles,
    ...variants[variant],
    ...sizes[size],
    ...customStyle,
    opacity: disabled ? 0.6 : 1,
  };

  return (
    <button type={type} onClick={onClick} style={combinedStyles} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
