import Input from "../common/Input.jsx";
import Button from "../common/Button";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUserAction } from "../../redux/reducers/userActions";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isPasswordVisible: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, message, user } = useSelector((state) => state.user);

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
    await dispatch(
      loginUserAction({
        email: formData.email,
        password: formData.password,
      })
    );
    setFormData({
      email: "",
      password: "",
      isPasswordVisible: false,
    });
  };

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
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
      marginBottom: "30px",
      color: "#222",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
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
      color: "#555",
      justifyContent: "flex-start",
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
    signupText: {
      marginTop: "20px",
      fontSize: "14px",
      color: "#555",
    },
    signupLink: {
      color: "#2575fc",
      textDecoration: "none",
      fontWeight: "600",
    },
    message: {
      marginTop: "15px",
      color: "green",
      fontWeight: "500",
    },
    error: {
      marginTop: "15px",
      color: "red",
      fontWeight: "500",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form style={styles.form} onSubmit={formHandler}>
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
          type={formData.isPasswordVisible ? "text" : "password"}
          name="password"
          value={formData.password}
          placeholder="Enter Password"
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
          {loading ? "Logging in..." : "LOGIN"}
        </Button>
      </form>
      <p style={styles.signupText}>
        Forgot Password?{" "}
        <Link to="/forgot-password" style={styles.signupLink}>
          click here
        </Link>
      </p>
      {message && <p style={styles.message}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

export default Login;
