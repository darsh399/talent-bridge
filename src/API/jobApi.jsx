import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api/v1/job",
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


export const addJob = (data) => handleRequest(API.post("/addjob", data));
export const getAllJobs = () => handleRequest(API.get("/get-all-jobs"));
export const getJobById = (id) => handleRequest(API.get(`/getjob/${id}`));
export const updateJob = (id, data) => handleRequest(API.put(`/updatejob/${id}`, data));
export const deleteJob = (id) => handleRequest(API.delete(`/delete/${id}`));
export const getMyJobs = () => handleRequest(API.get("/get-my/jobs"));
export const getjobByfilter = (data) => handleRequest(API.get('//getjobsbyfilter', data));
