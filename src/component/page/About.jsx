const About = () => {
  const styles = {
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      lineHeight: "1.7",
      color: "#333",
      maxWidth: "1000px",
      margin: "60px auto",
      padding: "0 20px",
    },
    heading: {
      fontSize: "36px",
      fontWeight: "700",
      marginBottom: "20px",
      textAlign: "center",
      color: "#007BFF",
    },
    subheading: {
      fontSize: "24px",
      fontWeight: "600",
      marginTop: "40px",
      marginBottom: "15px",
      color: "#222",
    },
    paragraph: {
      fontSize: "16px",
      color: "#555",
      marginBottom: "20px",
    },
    highlightBox: {
      background: "linear-gradient(135deg, #f9f9f9, #eaf6ff)",
      borderRadius: "12px",
      padding: "20px",
      marginTop: "20px",
      boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    },
    valuesList: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "20px",
      marginTop: "20px",
    },
    valueCard: {
      background: "#fff",
      borderRadius: "10px",
      padding: "15px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      textAlign: "center",
    },
    valueTitle: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "10px",
      color: "#007BFF",
    },
    valueText: {
      fontSize: "14px",
      color: "#555",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About Us</h1>
      <p style={styles.paragraph}>
        Welcome to our Job Portal – your trusted partner in building careers and connecting talent 
        with opportunities. Our platform empowers job seekers to explore thousands of jobs, apply 
        with ease, and take their careers to the next level, while helping employers find the 
        right talent effortlessly.
      </p>

      <div style={styles.highlightBox}>
        <h2 style={styles.subheading}>Our Mission</h2>
        <p style={styles.paragraph}>
          To simplify the job search and hiring process by providing a modern, user-friendly platform 
          that connects skilled professionals with top organizations worldwide.
        </p>
      </div>

      <div style={styles.highlightBox}>
        <h2 style={styles.subheading}>Our Vision</h2>
        <p style={styles.paragraph}>
          To become the go-to global career platform where talent meets opportunity, ensuring that 
          every job seeker finds the right role and every company discovers the right candidate.
        </p>
      </div>

      <h2 style={styles.subheading}>Our Core Values</h2>
      <div style={styles.valuesList}>
        <div style={styles.valueCard}>
          <h3 style={styles.valueTitle}>🌍 Inclusivity</h3>
          <p style={styles.valueText}>
            We believe in equal opportunities and building a diverse workforce for a better future.
          </p>
        </div>
        <div style={styles.valueCard}>
          <h3 style={styles.valueTitle}>🚀 Innovation</h3>
          <p style={styles.valueText}>
            We continuously evolve our platform to deliver the best experience to users and employers.
          </p>
        </div>
        <div style={styles.valueCard}>
          <h3 style={styles.valueTitle}>🤝 Trust</h3>
          <p style={styles.valueText}>
            We ensure transparency and reliability in every interaction between job seekers and recruiters.
          </p>
        </div>
        <div style={styles.valueCard}>
          <h3 style={styles.valueTitle}>📈 Growth</h3>
          <p style={styles.valueText}>
            We help individuals and companies achieve success by fostering career and business growth.
          </p>
        </div>
      </div>

      <h2 style={styles.subheading}>Why Choose Us?</h2>
      <p style={styles.paragraph}>
        Our platform makes job hunting and recruitment simple, fast, and effective. With smart search, 
        instant applications, and career insights, we go beyond a traditional job board to become your 
        complete career growth partner.
      </p>
    </div>
  );
};

export default About;
