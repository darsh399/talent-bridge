import { Link } from "react-router-dom";

const Footer = () => {
  const styles = {
    container: {
      backgroundColor: "#007BFF",
      color: "#fff",
      padding: "40px 20px",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: "30px",
      fontFamily: "Arial, sans-serif",
    },
    section: {
      flex: "1 1 200px",
      minWidth: "200px",
    },
    logo: {
      fontSize: "24px",
      fontWeight: "700",
      marginBottom: "15px",
    },
    links: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    link: {
      color: "#fff",
      textDecoration: "none",
      transition: "color 0.3s",
    },
    linkHover: {
      color: "#ffd700",
    },
    socialIcons: {
      display: "flex",
      gap: "15px",
      marginTop: "10px",
    },
    socialLink: {
      color: "#fff",
      fontSize: "20px",
      textDecoration: "none",
      transition: "color 0.3s",
    },
    copy: {
      width: "100%",
      textAlign: "center",
      marginTop: "30px",
      fontSize: "14px",
      borderTop: "1px solid rgba(255,255,255,0.3)",
      paddingTop: "20px",
      color: "#fff",
    },
  };

  return (
    <footer style={styles.container}>
      <div style={styles.section}>
        <div style={styles.logo}>JobPortal</div>
        <p>Your one-stop solution for finding your dream job and connecting with top employers.</p>
        <div style={styles.socialIcons}>
          <a style={styles.socialLink} href="https://facebook.com" target="_blank">FB</a>
          <a style={styles.socialLink} href="https://twitter.com" target="_blank">TW</a>
          <a style={styles.socialLink} href="https://linkedin.com" target="_blank">LI</a>
        </div>
      </div>
      <div style={styles.section}>
        <h3>Quick Links</h3>
        <div style={styles.links}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/about" style={styles.link}>About</Link>
          <Link to="/contact" style={styles.link}>Contact</Link>
          <Link to="/login" style={styles.link}>Login</Link>
          <Link to="/signup" style={styles.link}>Sign Up</Link>
        </div>
      </div>
      <div style={styles.section}>
        <h3>Contact Info</h3>
        <div>Email: support@jobportal.com</div>
        <div>Phone: +91 98765 43210</div>
        <div>Address: 123 JobPortal Street, Mumbai, India</div>
      </div>
      <div style={styles.copy}>
        &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
