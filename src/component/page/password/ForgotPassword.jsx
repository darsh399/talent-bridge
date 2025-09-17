import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordAction } from "../../../redux/reducers/userActions";
import Input from "../../common/Input";
import Button from "../../common/Button";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!email) return;
  const res = await dispatch(forgotPasswordAction({ email }));
  if (res?.success) {
    navigate("/verify-otp", { state: { email } });
    setEmail("");
  }
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
      <h2 style={styles.title}>Forgot Password</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your registered email"
          style={styles.input}
          required
        />
        <Button
          type="submit"
          variant="primary"
          size="medium"
          fullWidth
          disabled={loading}
        >
          SEND OTP
        </Button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

export default ForgotPassword;
