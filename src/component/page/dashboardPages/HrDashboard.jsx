import { useSelector } from "react-redux";
import JobCard from "./../../common/job/JobCard.jsx";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllJobs } from "../../../redux/reducers/job/jobAction.jsx";
import { Link } from "react-router-dom";

const HrDashBoard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { jobs, loading, error } = useSelector((state) => state.job);
  const [filteredJobs, setFilteredJobs] = useState([]);
  useEffect(() => {
    if (jobs.length === 0) {
      dispatch(getAllJobs());
    }
  }, [dispatch, jobs.length]);

  useEffect(() => {
    if (!user) return;
    const hrJobs = jobs.filter((job) => job.postedBy?._id === user._id); 
    setFilteredJobs(hrJobs);
  }, [jobs, user]);

  const styles = {
    container: {
      minHeight: "80vh",
      padding: "40px 20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "Arial, sans-serif",
      background: "linear-gradient(135deg, #00c6ff, #0072ff)",
      color: "#fff",
      borderRadius: "10px",
      margin: "40px auto",
      maxWidth: "1000px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    },
    heading: {
      fontSize: "36px",
      fontWeight: "700",
      marginBottom: "10px",
      textAlign: "center",
    },
    subText: {
      fontSize: "18px",
      marginBottom: "30px",
      fontWeight: "500",
      textAlign: "center",
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
    jobList: {
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center", 
  gap: "20px",       
},
    guestMessage: {
      fontSize: "20px",
      fontWeight: "500",
      marginTop: "20px",
      color: "#ffebcd",
    },
  };

  
  const renderHrOptions = () => (
    <div style={styles.buttonContainer}>
      <Link to='/add-job'><button style={styles.button}>Post New Job</button></Link>
      <button style={styles.button}>Manage Posted Jobs</button>
      <button style={styles.button}>View Applications</button>
      <button style={styles.button}>Reports</button>
    </div>
  );

  
  const renderGuest = () => (
    <div style={styles.guestMessage}>
      <p>Please log in as HR to access your dashboard.</p>
    </div>
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        Welcome {user?.name || "Guest"}!
      </h1>
      <p style={styles.subText}>
        {user?.role === "hr" ? "HR Dashboard" : "Guest Dashboard"}
      </p>

      {user?.role === "hr" ? renderHrOptions() : renderGuest()}

      {user?.role === "hr" && (
        <div style={styles.jobList}>
          {loading && <p>Loading jobs...</p>}
          {error && <p>{error}</p>}
          {!loading && filteredJobs.length === 0 && <p>No jobs posted yet.</p>}
          {filteredJobs.map((job) =>  (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HrDashBoard;
