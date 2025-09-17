import { useState } from "react";
import Input from "../../Input.jsx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addJob } from "../../../../redux/reducers/job/jobAction.jsx";

const AddJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    jobType: "",
    skillsRequired: [],
    description: "",
  });

  const [skill, setSkill] = useState(""); 

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addSkill = () => {
    if (skill.trim() === "") return;
    setFormData({
      ...formData,
      skillsRequired: [...formData.skillsRequired, skill.trim()],
    });
    setSkill("");
  };

  const removeSkill = (index) => {
    const newSkills = formData.skillsRequired.filter((_, i) => i !== index);
    setFormData({ ...formData, skillsRequired: newSkills });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addJob(formData));
      navigate("/dashboard");
    } catch (error) {
      console.log("error in adding job", error);
    }
  };

  const styles = {
    container: {
      maxWidth: "600px",
      margin: "40px auto",
      padding: "30px",
      background: "#fff",
      borderRadius: "10px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    heading: {
      textAlign: "center",
      fontSize: "28px",
      marginBottom: "20px",
      color: "#333",
    },
    button: {
      padding: "12px 20px",
      fontSize: "16px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      color: "#fff",
      background: "#007BFF",
      transition: "all 0.3s",
    },
    skillTag: {
      display: "inline-block",
      padding: "5px 10px",
      margin: "5px",
      background: "#eee",
      borderRadius: "5px",
      cursor: "pointer",
    },
    select: {
      padding: "10px",
      fontSize: "16px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      outline: "none",
      backgroundColor: "#fff",
      transition: "border-color 0.3s, box-shadow 0.3s",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add New Job</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <Input
          placeholder="Job Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <Input
          placeholder="Company"
          name="company"
          value={formData.company}
          onChange={handleChange}
        />
        <Input
          placeholder="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
        <Input
          placeholder="Salary"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
        />

        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="">SELECT JOB TYPE</option>
          <option value="full-time">FULL TIME</option>
          <option value="contract">CONTRACT</option>
          <option value="part-time">PART TIME</option>
          <option value="internship">INTERNSHIP</option>
        </select>

        <div>
          <input
            type="text"
            placeholder="Add a skill"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            style={{ padding: "8px", width: "70%", marginRight: "10px" }}
          />
          <button
            type="button"
            onClick={addSkill}
            style={{ ...styles.button, padding: "8px 16px" }}
          >
            Add
          </button>
          <div style={{ marginTop: "10px" }}>
            {formData.skillsRequired.map((s, index) => (
              <span
                key={index}
                style={styles.skillTag}
                onClick={() => removeSkill(index)}
                title="Click to remove"
              >
                {s} &times;
              </span>
            ))}
          </div>
        </div>

        <Input
          placeholder="Job Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          textarea
        />
        <button type="submit" style={styles.button}>
          Add Job
        </button>
      </form>
    </div>
  );
};

export default AddJob;
