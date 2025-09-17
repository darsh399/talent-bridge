
import { useState } from "react";
import Button from "./../Button.jsx";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteJob } from "../../../redux/reducers/job/jobAction.jsx";

const JobCard = ({ job }) => {
  const [hover, setHover] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const styles = {
    card: {
      background: "#fff",
      borderRadius: "16px",
      padding: "24px",
      boxShadow: hover
        ? "0 12px 28px rgba(0,0,0,0.15)"
        : "0 8px 20px rgba(0,0,0,0.1)",
      width: "320px",
      transition: "all 0.3s ease",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      gap: "12px",
    },
    title: { fontSize: "20px", fontWeight: "700", color: "#222", marginBottom: "6px" },
    company: { fontSize: "15px", fontWeight: "500", color: "#555", marginBottom: "10px" },
    infoRow: { display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#666", marginBottom: "12px" },
    divider: { height: "1px", backgroundColor: "#eee", margin: "12px 0" },
    badge: { background: "linear-gradient(90deg, #6a11cb, #2575fc)", color: "#fff", padding: "5px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "500", marginBottom: "6px", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" },
    skillsContainer: { display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" },
    postedBy: { fontSize: "13px", color: "#999", marginBottom: "12px" },
    buttonContainer: { display: "flex", gap: "10px", marginTop: "6px", flexWrap: "wrap" },
  };

  const deleteJobHandler = async (id) => {
    await dispatch(deleteJob(id));
  };

  const applyJobHandler = async () => {
    if (!user) {
      return alert("Please login first to apply for this job.");
    }

    alert("Applied for job successfully!");
  };

  return (
    <div
      style={styles.card}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div>
        <div style={styles.title}>{job.title}</div>
        <div style={styles.company}>{job.company} - {job.location}</div>
        <div style={styles.infoRow}>
          <span>Salary: {job.salary}</span>
          <span style={{ textTransform: "capitalize" }}>{job.jobType}</span>
        </div>
        <div style={styles.divider}></div>
        <div style={styles.skillsContainer}>
          {job.skillsRequired.map((skill, index) => (
            <span style={styles.badge} key={index}>{skill}</span>
          ))}
        </div>
        <div style={styles.postedBy}>Posted by: {job.postedBy?.name || "Unknown"}</div>
      </div>

      <div style={styles.buttonContainer}>
        <Link to={`/jobdetails/${job._id}`}>
          <Button variant="primary" size="medium">View Details</Button>
        </Link>

        {user?._id === job.postedBy?._id ? (
          <Button onClick={() => deleteJobHandler(job._id)}>DELETE</Button>
        ) : (
          <Button variant="secondary" size="medium" onClick={applyJobHandler}>
            Apply
          </Button>
        )}
      </div>
    </div>
  );
};

export default JobCard;
