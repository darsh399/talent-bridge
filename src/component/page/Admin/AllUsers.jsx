import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUserAction, userDeactivate, deleteUserAction, userActivate } from "../../../redux/reducers/userActions";
import Button from "../../common/Button";

const UsersPage = () => {
  const [userSelected, setUserSelected] = useState("all");
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAllUserAction());
  }, [dispatch]);

  const handleActivate = (id) => {
    dispatch(userActivate(id));
  };

  const handleDeactivate = (id) => {
    dispatch(userDeactivate(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteUserAction(id));
  };

  const filteredUsers =
    userSelected === "all"
      ? users
      : users.filter((u) => u.role === userSelected);

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "40px" }}>Loading users...</p>
    );

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>User Management</h1>
        <NavLink to="/dashboard" style={styles.dashboardLink}>
          Go to Dashboard
        </NavLink>
      </div>

      {/* Filter */}
      <div style={styles.filterWrapper}>
        <label style={styles.label}>Filter by Role:</label>
        <select
          style={styles.select}
          value={userSelected}
          onChange={(e) => setUserSelected(e.target.value)}
        >
          <option value="all">All Users</option>
          <option value="hr">HR</option>
          <option value="user">Users</option>
        </select>
      </div>

      {/* Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Full Name</th>
              <th style={styles.th}>Email Address</th>
              <th style={styles.th}>User Role</th>
              <th style={styles.th}>Account Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u, index) => (
                <tr
                  key={u._id}
                  style={index % 2 === 0 ? styles.trEven : styles.trOdd}
                >
                  <td style={styles.td}>
                    <NavLink
                      to={`/user/${u._id}`}
                      style={styles.nameLink}
                    >
                      {u.name}
                    </NavLink>
                  </td>
                  <td style={styles.td}>{u.email}</td>
                  <td style={styles.td}>{u.role}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.badge,
                        backgroundColor: u.isSuspended ? "#ff4d4f" : "#52c41a",
                      }}
                    >
                      {u.isSuspended ? "Suspended" : "Active"}
                    </span>
                  </td>
                  <td style={{ ...styles.td, textAlign: "center" }}>
                    {u.isSuspended ? (
                      <Button onClick={() => handleActivate(u._id)}>
                        Activate
                      </Button>
                    ) : (
                      <Button onClick={() => handleDeactivate(u._id)}>
                        Deactivate
                      </Button>
                    )}
                    <Button
                      onClick={() => handleDelete(u._id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={styles.noData} colSpan="5">
                  No users found for "{userSelected}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
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
    alignItems: "center",
    marginBottom: "25px",
  },
  title: { fontSize: "28px", fontWeight: "700", color: "#333" },
  dashboardLink: {
    textDecoration: "none",
    padding: "10px 16px",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    color: "#fff",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    transition: "0.3s",
  },
  filterWrapper: {
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  label: { fontSize: "16px", fontWeight: "500", color: "#444" },
  select: {
    padding: "10px 14px",
    fontSize: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  tableWrapper: {
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    overflow: "hidden",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    color: "#fff",
    padding: "14px 18px",
    textAlign: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
  td: {
    padding: "14px 18px",
    fontSize: "14px",
    color: "#333",
    borderBottom: "1px solid #eee",
  },
  trEven: { backgroundColor: "#fafafa" },
  trOdd: { backgroundColor: "#f0f4f8" },
  noData: {
    padding: "20px",
    textAlign: "center",
    color: "#888",
    fontStyle: "italic",
  },
  nameLink: { textDecoration: "none", color: "#2575fc", fontWeight: "500" },
  badge: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "600",
  },
  deleteBtn: {
    marginLeft: "8px",
    backgroundColor: "#ff4d4f",
    color: "#fff",
  },
};

export default UsersPage;
