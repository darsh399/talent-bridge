import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import JobCard from './../../common/job/JobCard.jsx';
import { getAllJobs } from "../../../redux/reducers/job/jobAction.jsx";

const UserDashBoard = () => {
  const dispatch = useDispatch();
  const { jobs, searchText, loading } = useSelector((state) => state.job);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch]);

  useEffect(() => {
    const result = !searchText || searchText.trim() === ""
      ? jobs
      : jobs.filter((job) =>
          [job.title, job.description, job.company, job.location, job.jobType, job.skillsRequired]
            .some((field) => {
              if (!field) return false;
              const strField = Array.isArray(field) ? field.join(" ") : String(field);
              return strField.toLowerCase().includes(searchText.toLowerCase());
            })
        );

    setFilteredJobs(result);
  }, [jobs, searchText]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
      {filteredJobs.length > 0 ? (
        filteredJobs.map((currJob) => (
          <JobCard key={currJob._id} job={currJob} />
        ))
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
};

export default UserDashBoard;
