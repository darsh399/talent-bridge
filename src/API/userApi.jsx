import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api/v1/user",
  withCredentials: true,
});

const handleRequest = async (request) => {
  try {
    const res = await request;
    return res.data; 
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data || new Error(error.message);
  }
};

export const fetchCurrentUser = () => handleRequest(API.get("/me"));
export const registerUser = (user) => handleRequest(API.post("/register", user));
export const loginUser = (user) => handleRequest(API.post("/login", user));
export const logoutUser = () => handleRequest(API.post("/logout"));
export const createUser = (id, newData) => handleRequest(API.post(`/createuser/${id}`, newData));
export const suspendUser = (id) => handleRequest(API.put(`/deactivateuser/${id}`))
export const activateUser = (id) => handleRequest(API.put(`/activateuser/${id}`))

export const getAllUsers = () => handleRequest(API.get("/"));
export const getUserById = (id) => handleRequest(API.get(`/user/${id}`));
export const updateUser = (id, data) =>
  handleRequest(API.put(`/update/${id}`, data));
export const deleteUserById = (id, password) =>
  handleRequest(API.delete(`/delete/${id}`, { data: { password } })); 


export const changePassword = (data) => handleRequest(API.post("/change-password", data));
export const forgotPassword = (data) => handleRequest(API.post("/forgot-password", data));
export const verifyOtp = (data) => handleRequest(API.post("/verify-otp", data));
export const setNewPassword = (data) => handleRequest(API.post("/set-new-password", data));
