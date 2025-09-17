import { useParams, useNavigate } from "react-router-dom";
import { getJobById } from "../../API/jobApi";
import { useEffect, useState } from "react";
import Button from "../common/Button";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const data = await getJobById(id);
        setJob(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch job details.");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "80px", fontSize: "20px" }}>Loading...</p>;
  if (error)
    return <p style={{ textAlign: "center", marginTop: "80px", color: "red", fontSize: "20px" }}>{error}</p>;
  if (!job)
    return <p style={{ textAlign: "center", marginTop: "80px", fontSize: "20px" }}>Job not found</p>;

  // ---------- Styles ----------
  const container = {
    maxWidth: "800px",
    margin: "60px auto",
    padding: "20px",
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  const card = {
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    padding: "24px",
    textAlign: "left",
  };

  const title = {
    fontSize: "28px",
    fontWeight: "700",
    color: "#222",
    marginBottom: "10px",
  };

  const subtitle = {
    fontSize: "18px",
    color: "#555",
    marginBottom: "16px",
  };

  const infoRow = {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "16px",
    color: "#444",
  };

  const sectionTitle = {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "12px",
    color: "#222",
  };

  const paragraph = {
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#444",
  };

  const badge = {
    background: "linear-gradient(90deg,#6a11cb,#2575fc)",
    color: "#fff",
    padding: "6px 14px",
    borderRadius: "24px",
    fontSize: "13px",
    fontWeight: "600",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  };

  const footer = {
    textAlign: "center",
    marginTop: "20px",
  };

  return (
    <div style={container}>
      {/* Back Button */}
      <Button variant="secondary" onClick={() => navigate(-1)} style={{ width: "100px" }}>
        ← Back
      </Button>

      {/* Job Title & Company */}
      <div style={card}>
        <h1 style={title}>{job.title}</h1>
        <p style={subtitle}>
          {job.company} • {job.location}
        </p>
        <div style={infoRow}>
          <span><strong>💰 Salary:</strong> {job.salary || "Not specified"}</span>
          <span><strong>📌 Type:</strong> {job.jobType}</span>
        </div>
      </div>

      {/* Description */}
      <div style={card}>
        <div style={sectionTitle}>📄 Description</div>
        <p style={paragraph}>{job.description}</p>
      </div>

      {/* Skills */}
      <div style={card}>
        <div style={sectionTitle}>🛠 Skills Required</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {job.skillsRequired.map((skill, index) => (
            <span key={index} style={badge}>{skill}</span>
          ))}
        </div>
      </div>

      {/* Posted By */}
      <div style={card}>
        <div style={sectionTitle}>👤 Posted By</div>
        <p style={{ fontSize: "16px", color: "#555" }}>
          {job.postedBy?.name || "Unknown"}
        </p>
      </div>

      {/* Apply Button */}
      <div style={footer}>
        <Button
          variant="primary"
          size="large"
          style={{ padding: "14px 40px", fontSize: "16px" }}
          onClick={() => alert(`Applied to ${job.title}`)}
        >
          🚀 Apply Now
        </Button>
      </div>
    </div>
  );
};

export default JobDetails;
