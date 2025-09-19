import { NavLink } from "react-router-dom";
import Button from "../common/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserByIDAction } from "../../redux/reducers/userActions";
import { useDispatch } from "react-redux";
const UserDetail = () => {
const [user, setUser] = useState("");
    
  const {id} = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const getUser = async() => {
        const res = await dispatch(getUserByIDAction(id));
        setUser(res.user)
    }
    getUser();
  }, [id]);
 console.log(user, 'userrrrrrrrrrrrrrrrrrrrrr')
 if (!user) return <p style={styles.error}>User not found</p>;
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>{user.name} - Details</h1>
        <NavLink to="/users" style={styles.backLink}>
          ← Back to Users
        </NavLink>
      </div>

      <div style={styles.card}>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Mobile:</strong> {user.mobileNo}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Status:</strong> {user.isSuspended ? "Suspended ❌" : "Active ✅"}</p>
      </div>

      <div style={styles.actions}>
        {user.isSuspended ? (
          <Button onClick={onActivate}>Activate</Button>
        ) : (
          <Button onClick={onDeactivate}>Deactivate</Button>
        )}
      </div>

      {user.profile?.created && (
        <div style={styles.profileCard}>
          <h2 style={styles.subtitle}>Profile Information</h2>
          <p><strong>10th School:</strong> {user.profile.tenth?.schoolName}</p>
          <p><strong>10th %:</strong> {user.profile.tenth?.percentage}</p>
          <p><strong>12th College:</strong> {user.profile.twelfth?.collegeName}</p>
          <p><strong>Graduation:</strong> {user.profile.graduation?.collegeName}</p>
          <p>
            <strong>Experience:</strong>{" "}
            {user.profile.experience?.isFresher
              ? "Fresher"
              : `${user.profile.experience.years} years`}
          </p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    fontFamily: "'Segoe UI', sans-serif",
    background: "#f9f9fc",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px",
    alignItems: "center",
  },
  title: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#333",
  },
  backLink: {
    textDecoration: "none",
    color: "#2575fc",
    fontWeight: "600",
    fontSize: "14px",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    marginBottom: "20px",
  },
  profileCard: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    marginTop: "20px",
  },
  subtitle: {
    fontSize: "20px",
    marginBottom: "15px",
    color: "#444",
  },
  actions: {
    marginTop: "20px",
  },
  error: { color: "red", textAlign: "center", marginTop: "40px" },
};

export default UserDetail;
