import Input from "../common/Input";
import { useEffect, useState } from "react";
import { updateUserAction } from "../../redux/reducers/userActions";
import { useDispatch, useSelector } from "react-redux";
import Button from "../common/Button";
import "./UpdateProfile.css";
import { useParams, useNavigate } from "react-router-dom";
const UpdateProfile = () => {
  const [newFormData, setNewFormData] = useState({
    name: "",
    email: "",
    mobileNo: ""
  });

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const {id} = useParams();
  const navigate = useNavigate();
  const inputhandler = (e) => {
    setNewFormData({ ...newFormData, [e.target.name]: e.target.value });
  };

  const formHandler = async (e) => {
    e.preventDefault();
    try {
     const res = await dispatch(updateUserAction(id,newFormData));
     if(res.success){
      navigate('/dashboard')
     }
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    if (user) {
      setNewFormData({
        name: user.name,
        email: user.email,
        mobileNo: user.mobileNo || ""
      });
    }
  }, [user]);

  return (
    <div className="update-profile-page">
      <div className="form-container">
        <h2 className="form-title">Update Your Profile</h2>
        <form onSubmit={formHandler} className="update-form">
          <Input
            value={newFormData.name}
            placeholder="Enter Name"
            name="name"
            onChange={inputhandler}
          />
          <Input
            value={newFormData.email}
            placeholder="Enter Email"
            name="email"
            onChange={inputhandler}
          />
          <Input
            value={newFormData.mobileNo}
            placeholder="Enter Mobile Number"
            name="mobileNo"
            onChange={inputhandler}
          />
          <Button type="submit">UPDATE</Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
