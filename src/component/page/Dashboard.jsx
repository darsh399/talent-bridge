import { useSelector } from "react-redux";
import UserDashBoard from "./dashboardPages/UserDashBoard.jsx";
import HrDashBoard from "./dashboardPages/HrDashboard.jsx";
import Home from './Home.jsx';
import AdminDashBoard from "./dashboardPages/AdminDashBoard.jsx";
const Dashboard = () => {
  const { user } = useSelector((state) => state.user);

  const styles = {
    container: {
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      background: "linear-gradient(135deg, #6a11cb, #2575fc)",
      color: "#fff",
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      padding: "40px 20px",
      borderRadius: "10px",
      margin: "40px auto",
      maxWidth: "900px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    },
    heading: {
      fontSize: "36px",
      fontWeight: "700",
      marginBottom: "10px",
    },
    subText: {
      fontSize: "18px",
      marginBottom: "30px",
      fontWeight: "500",
    },
    buttonContainer: {
      display: "flex",
      gap: "15px",
      flexWrap: "wrap",
      justifyContent: "center",
      marginBottom: "30px",
    },
    button: {
      padding: "12px 20px",
      fontSize: "16px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      color: "#fff",
      background: "#ff7f50",
      transition: "all 0.3s",
    },
    guestMessage: {
      fontSize: "20px",
      marginTop: "20px",
      fontWeight: "500",
      color: "#ffebcd",
    },
    sectionTitle: {
      textAlign: "left",
      color: "#fff",
      marginBottom: "15px",
      fontSize: "22px",
      fontWeight: "600",
    },
  };

  const renderAdminOptions = () => (
   <AdminDashBoard/>
  );


  const renderUserOptions = () => (
    <>
      <div style={styles.buttonContainer}>
        <button style={styles.button}>Browse Jobs</button>
        <button style={styles.button}>My Applications</button>
        <button style={styles.button}>Profile Settings</button>
      </div>

      {/* Jobs Section */}
      <div style={{ width: "100%", marginTop: "30px" }}>
        <h2 style={styles.sectionTitle}>Available Jobs</h2>
        <UserDashBoard />
      </div>
    </>
  );

 
  const renderHrOptions = () => (
    <>

      <div style={{ width: "100%", marginTop: "30px" }}>
        <h2 style={styles.sectionTitle}>Jobs You Posted</h2>
       <HrDashBoard/>
      </div>
    </>
  );

  
  const renderGuestOptions = () => (
    <Home/>
  );

  return (
    <div >
    

      {user?.role === "admin"
        ? renderAdminOptions()
        : user?.role === "hr"
        ? renderHrOptions()
        : user?.role === "user"
        ? renderUserOptions()
        : renderGuestOptions()}
    </div>
  );
};

export default Dashboard;
