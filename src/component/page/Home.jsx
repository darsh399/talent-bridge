
import { useEffect } from "react";
import Button from "../common/Button";
import { getAllJobs } from "../../redux/reducers/job/jobAction.jsx";
import JobCard from "../common/job/JobCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Home = () => {
 
 
  
  const dispatch = useDispatch();


  const { jobs } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch]);

  
  const styles = {
    container: { fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: "#333", lineHeight: "1.6" },
    hero: {
      minHeight: "70vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #007BFF, #00C6FF)",
      color: "#fff",
      textAlign: "center",
      padding: "0 20px",
    },
    heroHeading: { fontSize: "52px", fontWeight: "800", marginBottom: "20px" },
    heroSubtext: { fontSize: "22px", marginBottom: "35px", maxWidth: "700px" },
    heroButtons: { display: "flex", gap: "15px", flexWrap: "wrap", justifyContent: "center" },
    section: { padding: "60px 20px", textAlign: "center" },
    sectionHeading: { fontSize: "36px", fontWeight: "700", marginBottom: "40px", display: "inline-block", position: "relative" },
    underline: { display: "block", width: "50px", height: "4px", backgroundColor: "#007BFF", margin: "10px auto 0", borderRadius: "2px" },
    featureCards: { display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "25px" },
    card: { background: "#fff", padding: "20px", borderRadius: "15px", boxShadow: "0 8px 20px rgba(0,0,0,0.1)", width: "280px", transition: "all 0.3s ease", cursor: "pointer" },
    cardHover: { transform: "translateY(-5px)", boxShadow: "0 15px 25px rgba(0,0,0,0.15)" },
    cardTitle: { fontSize: "20px", fontWeight: "700", color: "#007BFF", marginBottom: "10px" },
    cardText: { fontSize: "16px", color: "#555", marginBottom: "8px" },
    skillBadge: { background: "#e0f0ff", padding: "4px 8px", borderRadius: "5px", fontSize: "12px", marginRight: "5px", marginBottom: "5px" },
    postedBy: { fontSize: "12px", color: "#888", marginTop: "12px" },
    jobGrid: { display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", marginTop: "30px" },
    aboutSection: { background: "linear-gradient(120deg, #f7f7f7, #e3f2fd)", padding: "80px 20px" },
    aboutText: { maxWidth: "750px", margin: "0 auto", fontSize: "17px", color: "#555", lineHeight: "1.8" },
  };

  const features = [
    { title: "Easy Job Search", text: "Find jobs by title, location, or category in seconds." },
    { title: "Apply Online", text: "Submit your applications directly through our platform." },
    { title: "Track Your Applications", text: "Monitor the status of every job application you submit." },
    { title: "Career Insights", text: "Get tips, trends, and advice to grow in your career." },
  ];

  return (
    <div style={styles.container}>
      <section style={styles.hero}>
        <h1 style={styles.heroHeading}>Find Your Dream Job</h1>
        <p style={styles.heroSubtext}>Search, apply, and grow your career with top companies worldwide.</p>
        <div style={styles.heroButtons}>
  <a href="#latest-jobs">
  <Button variant="primary" size="medium">Browse Jobs</Button>
</a>
  <Link to="/authpage">
    <Button variant="secondary" size="medium">Login</Button>
  </Link>
</div>

      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>
          Our Features
        <span style={styles.underline}></span>
        </h2>
        <div style={styles.featureCards}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={styles.card}
            >
              <h3 style={styles.cardTitle}>{feature.title}</h3>
              <p style={styles.cardText}>{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="latest-jobs" style={styles.section}>
        <h2 style={styles.sectionHeading}>
          Latest Jobs
          <span style={styles.underline}></span>
        </h2>
        <div style={styles.jobGrid}>
          {jobs.length ? (
            jobs.map((job, index) => <JobCard key={index} job={job} />)
          ) : (
            <p>No jobs available right now.</p>
          )}
        </div>
      </section>

      <section style={styles.aboutSection}>
        <h2 style={styles.sectionHeading}>
          About Our Portal
          <span style={styles.underline}></span>
        </h2>
        <p style={styles.aboutText}>
          Our job portal connects talented professionals with top employers worldwide. 
          Create your profile, browse thousands of jobs, submit applications online, 
          and take your career to the next level. Stay updated with career insights 
          and growth tips to maximize your potential.
        </p>
      </section>
    </div>
  );
};

export default Home;
