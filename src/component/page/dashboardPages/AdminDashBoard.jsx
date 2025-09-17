import { useSelector } from "react-redux";
import { getAllJobs } from "../../../API/jobApi";
import { getAllUsers } from "../../../API/userApi";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const AdminDashBoard = () => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const getData = async () => {
      try {
        const resJobs = await getAllJobs();
        const resUsers = await getAllUsers();
        setJobs(Array.isArray(resJobs) ? resJobs : resJobs?.jobs || []);
        setUsers(Array.isArray(resUsers) ? resUsers : resUsers?.users || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const activeHRs = users.filter((u) => u.role === "hr").length;

  if (loading) return <p style={styles.loading}>Loading dashboard...</p>;

  const chartData = [
    { name: "Users", count: users.length },
    { name: "Jobs", count: jobs.length },
    { name: "HRs", count: activeHRs },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Dashboard</h1>

      <div style={styles.section}>
        <h2 style={styles.subtitle}>Welcome, {user?.name || "Admin"} 👋</h2>
        <p style={styles.text}>Here’s an overview of your platform’s activities.</p>
      </div>

      {/* Stats Cards */}
      <div style={styles.cards}>
        <div style={{ ...styles.card, background: "linear-gradient(135deg, #6a11cb, #2575fc)" }}>
          <h3 style={styles.cardTitle}>Total Users</h3>
          <p style={styles.cardCount}>{users.length}</p>
        </div>
        <div style={{ ...styles.card, background: "linear-gradient(135deg, #fc5c7d, #6a82fb)" }}>
          <h3 style={styles.cardTitle}>Total Jobs</h3>
          <p style={styles.cardCount}>{jobs.length}</p>
        </div>
        <div style={{ ...styles.card, background: "linear-gradient(135deg, #43cea2, #185a9d)" }}>
          <h3 style={styles.cardTitle}>Active HRs</h3>
          <p style={styles.cardCount}>{activeHRs}</p>
        </div>
      </div>

     
      <div style={styles.chartContainer}>
        <h2 style={styles.subtitle}>Platform Overview</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" radius={[10, 10, 0, 0]} barSize={60} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f4f6f8",
    minHeight: "100vh",
  },
  loading: {
    fontSize: "18px",
    textAlign: "center",
    marginTop: "50px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "25px",
    color: "#333",
  },
  section: { marginBottom: "40px" },
  subtitle: { fontSize: "22px", fontWeight: "600", marginBottom: "12px", color: "#444" },
  text: { fontSize: "16px", color: "#666" },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "25px",
    marginBottom: "50px",
  },
  card: {
    padding: "30px",
    borderRadius: "15px",
    color: "#fff",
    textAlign: "center",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  },
  cardTitle: { fontSize: "18px", marginBottom: "10px", fontWeight: "500" },
  cardCount: { fontSize: "28px", fontWeight: "700" },
  chartContainer: { marginTop: "20px", height: "350px", background: "#fff", padding: "20px", borderRadius: "15px", boxShadow: "0 5px 15px rgba(0,0,0,0.1)" },
};

export default AdminDashBoard;
