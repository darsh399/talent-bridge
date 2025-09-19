import { NavLink } from "react-router-dom";
import Button from "../common/Button";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getUserByIDAction, userDeactivate, userActivate } from "../../redux/reducers/userActions";
import { useDispatch, useSelector } from "react-redux";

const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.selecteduser);

  useEffect(() => {
    dispatch(getUserByIDAction(id));
  }, [id, dispatch]);

  if (!user) return <p style={styles.error}>User not found ❌</p>;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>{user.name}</h1>
        <NavLink to="/get-all-users" style={styles.backLink}>
          ← Back to Users
        </NavLink>
      </div>

      {/* User Info */}
      <div style={styles.card}>
        <div style={styles.infoRow}>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile:</strong> {user.mobileNo}</p>
        </div>
        <div style={styles.infoRow}>
          <p><strong>Role:</strong> {user.role}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              style={{
                ...styles.badge,
                backgroundColor: user.isSuspended ? "#ff4d4f" : "#52c41a",
              }}
            >
              {user.isSuspended ? "Suspended ❌" : "Active ✅"}
            </span>
          </p>
        </div>
        <div style={styles.infoRow}>
          <p><strong>Address:</strong> {user.address || "N/A"}</p>
          <p><strong>Date of Birth:</strong> {user.dob || "N/A"}</p>
        </div>
        <div style={styles.infoRow}>
          <p><strong>Gender:</strong> {user.gender || "N/A"}</p>
          <p><strong>Skills:</strong> {user.skills?.join(", ") || "N/A"}</p>
        </div>
      </div>

      {/* Actions */}
      <div style={styles.actions}>
        {user.isSuspended ? (
          <Button onClick={() => dispatch(userActivate(id))} style={styles.activateBtn}>
            Activate
          </Button>
        ) : (
          <Button onClick={() => dispatch(userDeactivate(id))} style={styles.deactivateBtn}>
            Deactivate
          </Button>
        )}
      </div>

      {/* Profile Section */}
      {user.profile?.created && (
        <div style={styles.profileCard}>
          <h2 style={styles.subtitle}>📄 Profile Information</h2>
          <div style={styles.profileGrid}>
            <p><strong>10th School:</strong> {user.profile.tenth?.schoolName}</p>
            <p><strong>10th %:</strong> {user.profile.tenth?.percentage}</p>
            <p><strong>12th College:</strong> {user.profile.twelfth?.collegeName}</p>
            <p><strong>12th %:</strong> {user.profile.twelfth?.percentage}</p>
            <p><strong>Graduation College:</strong> {user.profile.graduation?.collegeName}</p>
            <p><strong>Graduation %:</strong> {user.profile.graduation?.percentage}</p>
            <p><strong>Post Graduation College:</strong> {user.profile.postGraduation?.collegeName || "N/A"}</p>
            <p><strong>Post Graduation %:</strong> {user.profile.postGraduation?.percentage || "N/A"}</p>
            <p>
              <strong>Experience:</strong>{" "}
              {user.profile.experience?.isFresher
                ? "Fresher"
                : `${user.profile.experience.years} years`}
            </p>
            <p><strong>LinkedIn:</strong> {user.profile.social?.linkedIn || "N/A"}</p>
            <p><strong>GitHub:</strong> {user.profile.social?.github || "N/A"}</p>
            <p><strong>Portfolio:</strong> {user.profile.social?.portfolio || "N/A"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f4f6f9",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "25px",
    alignItems: "center",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  backLink: {
    textDecoration: "none",
    padding: "8px 14px",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    color: "#fff",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    transition: "0.3s",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    marginBottom: "25px",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
    fontSize: "15px",
    color: "#333",
  },
  badge: {
    padding: "4px 10px",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "600",
  },
  profileCard: {
    background: "#fff",
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    marginTop: "30px",
  },
  subtitle: {
    fontSize: "20px",
    marginBottom: "20px",
    color: "#444",
    borderBottom: "2px solid #f0f0f0",
    paddingBottom: "8px",
    fontWeight: "600",
  },
  profileGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px 30px",
    fontSize: "14px",
    color: "#333",
  },
  actions: {
    marginTop: "20px",
    display: "flex",
    gap: "15px",
  },
  activateBtn: {
    background: "#52c41a",
    color: "#fff",
  },
  deactivateBtn: {
    background: "#ff4d4f",
    color: "#fff",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: "40px",
    fontSize: "18px",
    fontWeight: "600",
  },
};

export default UserDetail;
