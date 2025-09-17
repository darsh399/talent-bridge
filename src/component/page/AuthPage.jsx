import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");

  const styles = {
    container: {
      maxWidth: "520px",
      margin: "60px auto",
      padding: "40px 30px",
      borderRadius: "16px",
      background: "#fff",
      fontFamily: "'Poppins', sans-serif",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    },
    tabs: {
      display: "flex",
      justifyContent: "space-around",
      marginBottom: "30px",
      borderBottom: "2px solid #eee",
    },
    tab: (isActive) => ({
      flex: 1,
      textAlign: "center",
      padding: "12px 0",
      cursor: "pointer",
      fontWeight: isActive ? "700" : "500",
      color: isActive ? "#2575fc" : "#777",
      borderBottom: isActive ? "3px solid #2575fc" : "3px solid transparent",
      transition: "all 0.3s ease",
    }),
  };

  return (
    <div style={styles.container}>
      <div style={styles.tabs}>
        <div
          style={styles.tab(activeTab === "login")}
          onClick={() => setActiveTab("login")}
        >
          Login
        </div>
        <div
          style={styles.tab(activeTab === "signup")}
          onClick={() => setActiveTab("signup")}
        >
          Sign Up
        </div>
      </div>

      {activeTab === "login" ? <Login /> : <SignUp />}
    </div>
  );
};

export default AuthPage;
