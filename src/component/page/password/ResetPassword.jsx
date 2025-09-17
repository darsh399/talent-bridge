import { useState } from "react";
import Input from "../../common/Input";
import { useSelector, useDispatch } from "react-redux";
import { setNewPasswordAction } from "../../../redux/reducers/userActions";
import Button from "../../common/Button";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { error, message, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const inputHandler = (e) => setNewPassword(e.target.value);

  const formHandler =async (e) => {
    e.preventDefault();
    if (!newPassword) return;
    await dispatch(setNewPasswordAction({ email: "", newPassword }));
    setNewPassword("");
  };

  const passwordVisibleHandler = () => setIsPasswordVisible((prev) => !prev);

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
    checkboxContainer: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "14px",
      cursor: "pointer",
      userSelect: "none",
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
      <h2 style={styles.title}>Reset Password</h2>
      <form style={styles.form} onSubmit={formHandler}>
        <Input
          type={isPasswordVisible ? "text" : "password"}
          value={newPassword}
          onChange={inputHandler}
          placeholder="Enter New Password"
          style={styles.input}
        />
        <label style={styles.checkboxContainer}>
          <input
            type="checkbox"
            checked={isPasswordVisible}
            onChange={passwordVisibleHandler}
          />
          {isPasswordVisible ? "Hide Password" : "Show Password"}
        </label>
        <Button
          type="submit"
          variant="primary"
          size="medium"
          fullWidth
          disabled={loading}
        >
          Reset Password
        </Button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

export default ResetPassword;
