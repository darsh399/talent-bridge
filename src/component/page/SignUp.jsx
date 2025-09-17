import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../common/Input.jsx";
import Button from "../common/Button";
import { addUserAction } from "../../redux/reducers/userActions";
import Notification from "../common/Notification";

const SignUp = () => {
  const { error, message, loading, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    password: "",
    confirmPassword: "",
    role: "",
    isPasswordVisible: false,
  });

  const [notif, setNotif] = useState(null);

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const passwordVisibleHandler = () => {
    setFormData((prev) => ({
      ...prev,
      isPasswordVisible: !prev.isPasswordVisible,
    }));
  };

  const formHandler = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setNotif({ message: "Passwords do not match", type: "error" });
      return;
    }
    try {
      await dispatch(addUserAction(formData));
      setNotif({ message: "Registration successful!", type: "success" });
      setFormData({
        name: "",
        email: "",
        mobileNo: "",
        password: "",
        role: "user",
        confirmPassword: "",
        isPasswordVisible: false,
      });
    } catch (err) {
      setNotif({ message: "Something went wrong", type: "error" });
    }
  };

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const styles = {
    container: {
      maxWidth: "480px",
      margin: "60px auto",
      padding: "50px 35px",
      borderRadius: "16px",
      background: "#fff",
      color: "#333",
      fontFamily: "'Poppins', sans-serif",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      textAlign: "center",
    },
    title: {
      fontSize: "32px",
      fontWeight: "700",
      marginBottom: "25px",
      color: "#222",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    input: {
      padding: "14px 16px",
      fontSize: "16px",
      borderRadius: "10px",
      border: "1px solid #ccc",
      outline: "none",
      width: "100%",
      boxSizing: "border-box",
    },
    checkboxContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontSize: "14px",
      cursor: "pointer",
      justifyContent: "flex-start",
      color: "#555",
    },
    button: {
      padding: "12px 20px",
      fontSize: "16px",
      fontWeight: "600",
      borderRadius: "10px",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
      background: "linear-gradient(to right, #6a11cb, #2575fc)",
      color: "#fff",
    },
    linkText: {
      marginTop: "20px",
      fontSize: "14px",
      color: "#555",
    },
    link: {
      color: "#2575fc",
      textDecoration: "none",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Sign Up</h2>
      <form style={styles.form} onSubmit={formHandler}>
        <Input
          style={styles.input}
          type="text"
          name="name"
          value={formData.name}
          placeholder="Enter Name"
          onChange={inputHandler}
        />
        <Input
          style={styles.input}
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter Email"
          onChange={inputHandler}
        />
        <Input
          style={styles.input}
          type="text"
          name="mobileNo"
          value={formData.mobileNo}
          placeholder="Enter Mobile Number"
          onChange={inputHandler}
        />
        <select
          name="role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          style={{ padding: "10px", borderRadius: "8px", marginTop: "10px" }}
        >
          <option value="">Select Role</option>
          <option value="hr">HR</option>
          <option value="user">User</option>
        </select>
        <Input
          style={styles.input}
          type={formData.isPasswordVisible ? "text" : "password"}
          name="password"
          value={formData.password}
          placeholder="Enter Password"
          onChange={inputHandler}
        />
        <Input
          style={styles.input}
          type={formData.isPasswordVisible ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          placeholder="Confirm Password"
          onChange={inputHandler}
        />
        <label style={styles.checkboxContainer}>
          <input
            type="checkbox"
            checked={formData.isPasswordVisible}
            onChange={passwordVisibleHandler}
          />
          Show Password
        </label>
        <Button
          type="submit"
          style={styles.button}
          fullWidth
          disabled={loading}
        >
          {loading ? "Signing Up..." : "SIGN UP"}
        </Button>
      </form>
      <p style={styles.linkText}>
        Already have an account? <Link to="/login" style={styles.link}>Log In</Link>
      </p>
      {notif && (
        <Notification
          message={notif.message}
          type={notif.type}
          onClose={() => setNotif(null)}
        />
      )}
    </div>
  );
};

export default SignUp;
