import { useEffect, useState } from "react";
import { getAllUsers } from "../../../API/userApi";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userDeactivate, userActivate } from "../../../redux/reducers/userActions";
import Button from "../../common/Button";
const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userSelected, setUserSelected] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(Array.isArray(res) ? res : res?.users || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleActivate = async (id) => {
  await dispatch(userActivate(id));
  setUsers((prev) =>
    prev.map((u) => (u._id === id ? { ...u, isSuspended: false } : u))
  );
};

const handleDeactivate = async (id) => {
  await dispatch(userDeactivate(id));
  setUsers((prev) =>
    prev.map((u) => (u._id === id ? { ...u, isSuspended: true } : u))
  );
};


  useEffect(() => {
    setSelectedUsers(
      userSelected === "all" ? users : users.filter((u) => u.role === userSelected)
    );
  }, [userSelected, users]);

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "40px" }}>Loading users...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>All Users</h1>
        <NavLink to="/dashboard" style={styles.dashboardLink}>
          Go to Dashboard
        </NavLink>
      </div>

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

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
  {selectedUsers.length > 0 ? (
    selectedUsers.map((u, index) => (
      <tr key={u._id} style={index % 2 === 0 ? styles.trEven : styles.trOdd}>
        <td style={styles.td}>
          <NavLink to={`/user/${u._id}`} style={{ textDecoration: "none", color: "#2575fc" }}>
            {u.name}
          </NavLink>
        </td>
        <td style={styles.td}>{u.email}</td>
        <td style={styles.td}>{u.role}</td>
        <td style={styles.td}>{u.isSuspended ? "suspended" : "active"}</td>
        <td style={styles.td}>
          {u.isSuspended ? (
            <Button onClick={() => handleActivate(u._id)}>ACTIVATE</Button>
          ) : (
            <Button onClick={() => handleDeactivate(u._id)}>DEACTIVATE</Button>
          )}
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
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#333",
  },
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
  label: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#444",
  },
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
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    color: "#fff",
    padding: "14px 18px",
    textAlign: "left",
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
};

export default UsersPage;
