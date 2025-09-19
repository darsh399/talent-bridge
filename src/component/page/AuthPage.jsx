import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <>
      {/* CSS inside same file */}
      <style>{`
        .auth-container {
          max-width: 520px;
          margin: 60px auto;
          padding: 40px 30px;
          border-radius: 16px;
          background: #fff;
          font-family: "Poppins", sans-serif;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        .auth-tabs {
          display: flex;
          justify-content: space-around;
          margin-bottom: 30px;
          border-bottom: 2px solid #eee;
        }

        .auth-tab {
          flex: 1;
          text-align: center;
          padding: 12px 0;
          cursor: pointer;
          font-weight: 500;
          color: #777;
          position: relative;
          transition: all 0.3s ease;
        }

        .auth-tab.active {
          font-weight: 700;
          color: #2575fc;
          border-bottom: 3px solid #2575fc;
          overflow: hidden;
        }

        /* ✨ Shine effect */
        .auth-tab.active::after {
          content: "";
          position: absolute;
          top: 0;
          left: -150%;
          width: 150%;
          height: 100%;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 20%,
            rgba(255, 255, 255, 0.6) 50%,
            rgba(255, 255, 255, 0) 80%
          );
          animation: shine 2s infinite;
        }

        @keyframes shine {
          from {
            left: -150%;
          }
          to {
            left: 150%;
          }
        }
      `}</style>

      <div className="auth-container">
        <div className="auth-tabs">
          <div
            className={`auth-tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </div>
          <div
            className={`auth-tab ${activeTab === "signup" ? "active" : ""}`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </div>
        </div>

        {activeTab === "login" ? <Login /> : <SignUp />}
      </div>
    </>
  );
};

export default AuthPage;
