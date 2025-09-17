import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { verifyOtpAction } from "../../../redux/reducers/userActions";
import { useLocation } from "react-router-dom";
const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.user);
const location = useLocation();
const email = location.state?.email;
  const submitHandler = (e) => {
    e.preventDefault();
    if (!otp) return;
    dispatch(verifyOtpAction({email, otp }));
  };

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "50px auto",
      padding: "30px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      backgroundColor: "#fff",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      textAlign: "center",
      marginBottom: "25px",
      color: "#333",
      fontSize: "24px",
      fontWeight: "600",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    input: {
      width: "100%",
      padding: "12px 10px",
      fontSize: "16px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      outline: "none",
      boxSizing: "border-box",
      transition: "border-color 0.3s",
    },
    button: {
      padding: "12px",
      backgroundColor: "#007bff",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "600",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    buttonDisabled: {
      backgroundColor: "#6c757d",
      cursor: "not-allowed",
    },
    message: {
      textAlign: "center",
      color: "green",
      fontSize: "14px",
      marginTop: "10px",
    },
    error: {
      textAlign: "center",
      color: "red",
      fontSize: "14px",
      marginTop: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Verify OTP</h2>
      <form style={styles.form} onSubmit={submitHandler}>
        <input
          type="number"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          style={styles.input}
          required
        />
        <button
          type="submit"
          style={{
            ...styles.button,
            ...(loading ? styles.buttonDisabled : {}),
          }}
          disabled={loading}
        >
          {loading ? "Verifying..." : "VERIFY OTP"}
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

export default VerifyOtp;
