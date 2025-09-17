import { NavLink } from "react-router-dom";
import UserNavBar from "./UserNavBar";


const Header = () => {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 30px",
      backgroundColor: "#35597e",
      color: "#fff",
      flexWrap: "wrap",
    },
    logo: {
      fontSize: "24px",
      fontWeight: "700",
      textDecoration: "none",
      color: "#fff",
    },
    nav: {
      display: "flex",
      gap: "20px",
      flexWrap: "wrap",
      alignItems: "center",
    },
  };

  return (
    <header style={styles.container}>
      <NavLink to="/" style={styles.logo}>
        JobPortal
      </NavLink>

      <nav style={styles.nav}>
        <UserNavBar />
      </nav>
    </header>
  );
};

export default Header;
