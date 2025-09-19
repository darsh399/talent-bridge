import { NavLink, useNavigate } from "react-router-dom";
import Input from "../../common/Input.jsx";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getJobByFilter } from "../../../redux/reducers/job/jobAction.jsx";
import { logoutUserAction } from "../../../redux/reducers/userActions.jsx";

const UserNavBar = () => {
  const { user } = useSelector((state) => state.user);
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const styles = {
    searchWrapper: { display: "flex", alignItems: "center", marginRight: "20px" },
    link: {
      textDecoration: "none",
      color: "#fff",
      padding: "6px 1px",
      fontWeight: "500",
      transition: "all 0.3s ease",
    },
    active: {
      color: "#ffd700",
      textDecoration: "underline",
      textUnderlineOffset: "4px",
      textDecorationThickness: "2px",
    },
  };

  const linkStyle = ({ isActive }) => ({
    ...styles.link,
    ...(isActive ? styles.active : {}),
  });

  const inputHandler = (e) => {
    setSearchInput(e.target.value);
    dispatch(getJobByFilter(e.target.value));
  };

  const logoutHandler = async () => {
    const res = await dispatch(logoutUserAction());
    console.log(res)
    if (res?.success) {
      navigate("/"); 
    }
  };

  const renderSearch = (placeholder) => (
    <div style={styles.searchWrapper}>
      <Input value={searchInput} onChange={inputHandler} placeholder={placeholder} />
    </div>
  );

  return (
    <>
      {user?.role === "user" && (
        <>
          {renderSearch("Search job")}
          <NavLink to={`/dashboard`} style={linkStyle}>Home</NavLink>
          <NavLink to={`/createuser/${user.id}`} style={linkStyle}>Profile</NavLink>
          <NavLink to={`/update-user/${user.id}`} style={linkStyle}>Update Profile</NavLink>
          <NavLink to="/applied-jobs" style={linkStyle}>Applied Jobs</NavLink>
          <span onClick={logoutHandler} style={{ ...styles.link, cursor: "pointer" }}>Logout</span>
        </>
      )}

      {user?.role === "hr" && (
        <>
          {renderSearch("Search jobs")}
          <NavLink to="/dashboard" style={linkStyle}>Dashboard</NavLink>
          <NavLink to="/add-job" style={linkStyle}>Post Job</NavLink>
          <NavLink to="/hr/posted-jobs" style={linkStyle}>My Jobs</NavLink>
          <NavLink to="/hr/applications" style={linkStyle}>View Applications</NavLink>
          <span onClick={logoutHandler} style={{ ...styles.link, cursor: "pointer" }}>Logout</span>
        </>
      )}

      {user?.role === "admin" && (
        <>
          <NavLink to="/dashboard" style={linkStyle}>Dashboard</NavLink>
          <NavLink to='/get-all-users' style={linkStyle}>Manage Users</NavLink>
          <NavLink to={`/update-user/${user._id}`}style={linkStyle}>Update Profile</NavLink>
          <span onClick={logoutHandler} style={{ ...styles.link, cursor: "pointer" }}>Logout</span>
        </>
      )}

      {!user && (
        <>
          <NavLink to="/" style={linkStyle}>Home</NavLink>
          <NavLink to="/authpage" style={linkStyle}>Login</NavLink>
          <NavLink to="/about" style={linkStyle}>About</NavLink>
          <NavLink to="/contact" style={linkStyle}>Contact</NavLink>
        </>
      )}
    </>
  );
};

export default UserNavBar;


