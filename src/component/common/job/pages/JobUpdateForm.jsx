import Input from "../../Input";
import Button from "../../Button";
import { useEffect, useState } from "react";

const JobUpdatForm = ({ job, cancel, update }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    jobType: "",
    skillsRequired: "",
  });

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || "",
        description: job.description || "",
        company: job.company || "",
        location: job.location || "",
        salary: job.salary || "",
        jobType: job.jobType || "",
        skillsRequired: job.skillsRequired?.join(", ") || "",
      });
    }
  }, [job]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const formHandler = async (e) => {
  e.preventDefault();
  const res = await update(job._id, formData);

  if (res.success) {
  
    cancel();
  } else {
    alert("Update failed: " + res.message);
  }
};


  const styles = {
    formContainer: {
      maxWidth: "600px",
      margin: "30px auto",
      padding: "30px",
      backgroundColor: "#fff",
      borderRadius: "12px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      fontFamily: "'Arial', sans-serif",
    },
    row: {
      display: "flex",
      gap: "20px",
      flexWrap: "wrap",
    },
    inputWrapper: {
      flex: "1 1 48%",
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },
    textareaWrapper: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "15px",
      marginTop: "10px",
      flexWrap: "wrap",
    },
    heading: {
      textAlign: "center",
      fontSize: "24px",
      fontWeight: "700",
      marginBottom: "10px",
      color: "#333",
    },
  };

  return (
    <form style={styles.formContainer} onSubmit={formHandler}>
      <h2 style={styles.heading}>Update Job Details</h2>

      <div style={styles.row}>
        <div style={styles.inputWrapper}>
          <label>Job Title</label>
          <Input name="title" value={formData.title} onChange={inputHandler} />
        </div>

        <div style={styles.inputWrapper}>
          <label>Company</label>
          <Input name="company" value={formData.company} onChange={inputHandler} />
        </div>
      </div>

      <div style={styles.row}>
        <div style={styles.inputWrapper}>
          <label>Location</label>
          <Input name="location" value={formData.location} onChange={inputHandler} />
        </div>

        <div style={styles.inputWrapper}>
          <label>Salary</label>
          <Input name="salary" value={formData.salary} onChange={inputHandler} />
        </div>
      </div>

      <div style={styles.row}>
        <div style={styles.inputWrapper}>
          <label>Job Type</label>
          <Input name="jobType" value={formData.jobType} onChange={inputHandler} />
        </div>

        <div style={styles.inputWrapper}>
          <label>Skills Required</label>
          <Input
            name="skillsRequired"
            value={formData.skillsRequired}
            onChange={inputHandler}
          />
        </div>
      </div>

      <div style={styles.textareaWrapper}>
        <label>Description</label>
        <Input
          name="description"
          textarea
          value={formData.description}
          onChange={inputHandler}
        />
      </div>

      <div style={styles.buttonContainer}>
        <Button type="button" onClick={cancel} variant="secondary">
          CANCEL
        </Button>
        <Button type="submit" variant="primary">
          SAVE
        </Button>
      </div>
    </form>
  );
};

export default JobUpdatForm;
