import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const styles = {
    container: {
      maxWidth: "1000px",
      margin: "50px auto",
      display: "flex",
      flexWrap: "wrap",
      gap: "40px",
      fontFamily: "Arial, sans-serif",
      padding: "20px",
    },
    formContainer: {
      flex: "1 1 400px",
      padding: "30px",
      borderRadius: "12px",
      backgroundColor: "#fff",
      boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
      transition: "transform 0.3s",
    },
    detailsContainer: {
      flex: "1 1 400px",
      padding: "30px",
      borderRadius: "12px",
      backgroundColor: "#fff",
      boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
    },
    title: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#007BFF",
      marginBottom: "25px",
      textAlign: "center",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    input: {
      padding: "14px",
      fontSize: "16px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      outline: "none",
      boxSizing: "border-box",
      transition: "border 0.3s",
    },
    inputFocus: {
      border: "1px solid #007BFF",
    },
    textarea: {
      padding: "14px",
      fontSize: "16px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      outline: "none",
      resize: "vertical",
      minHeight: "140px",
      transition: "border 0.3s",
    },
    button: {
      padding: "14px",
      fontSize: "16px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#007BFF",
      color: "#fff",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background 0.3s, transform 0.2s",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
      transform: "scale(1.02)",
    },
    detailsItem: {
      marginBottom: "20px",
      lineHeight: "1.6",
      fontSize: "16px",
    },
    detailsTitle: {
      fontWeight: "600",
      marginBottom: "5px",
      color: "#007BFF",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Contact Us</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <textarea
            style={styles.textarea}
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#007BFF")}
          >
            Send Message
          </button>
        </form>
      </div>
      <div style={styles.detailsContainer}>
        <h2 style={styles.title}>Our Details</h2>
        <div style={styles.detailsItem}>
          <div style={styles.detailsTitle}>Address:</div>
          123 JobPortal Street, Mumbai, India
        </div>
        <div style={styles.detailsItem}>
          <div style={styles.detailsTitle}>Phone:</div>
          +91 98765 43210
        </div>
        <div style={styles.detailsItem}>
          <div style={styles.detailsTitle}>Email:</div>
          support@jobportal.com
        </div>
        <div style={styles.detailsItem}>
          <div style={styles.detailsTitle}>Working Hours:</div>
          Monday - Friday: 10:00 AM - 7:00 PM
        </div>
      </div>
    </div>
  );
};

export default Contact;
