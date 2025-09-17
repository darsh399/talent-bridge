import { useState } from "react";

const Input = (props) => {
  const { type, name, placeholder, value, onChange, textarea } = props;

  const styles = {
    base: {
      width: "100%",
      padding: "10px 12px",
      fontSize: "16px",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "#ccc",   
      borderRadius: "5px",
      outline: "none",
      boxSizing: "border-box",
      resize: "vertical",
      transition: "border-color 0.3s",
    },
    focus: {
      borderColor: "#007BFF", 
    },
  };

  const [isFocused, setIsFocused] = useState(false);

  const combinedStyle = {
    ...styles.base,
    ...(isFocused ? styles.focus : {}),
  };

  if (textarea) {
    return (
      <textarea
        placeholder={placeholder || "Enter text"}
        value={value}
        onChange={onChange}
        style={combinedStyle}
        rows={4}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        name={name}
      />
    );
  }

  return (
    <input
      type={type || "text"}
      placeholder={placeholder || "Enter text"}
      value={value}
      onChange={onChange}
      style={combinedStyle}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      name={name}
    />
  );
};

export default Input;
