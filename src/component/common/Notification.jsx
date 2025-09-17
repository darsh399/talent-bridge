import { useEffect } from "react";

const Notification = ({ message, type = "success", onClose, duration = 3000 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const styles = {
    container: {
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      minWidth: "300px",
      padding: "15px 20px",
      borderRadius: "8px",
      color: "#fff",
      fontWeight: "bold",
      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "10px",
      zIndex: 1000,
      backgroundColor: type === "success" ? "#4caf50" : "#f44336",
      animation: "fadeIn 0.3s ease-in-out",
    },
    icon: { fontSize: "18px" },
    close: {
      cursor: "pointer",
      fontWeight: "bold",
      marginLeft: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <span style={styles.icon}>
        {type === "success" ? "✔️" : "❌"}
      </span>
      <span>{message}</span>
      <span style={styles.close} onClick={onClose}>✖</span>
    </div>
  );
};

export default Notification;
