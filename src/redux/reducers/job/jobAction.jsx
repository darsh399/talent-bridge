import {
  JOB_ADD_REQUEST,
  JOB_ADD_SUCCESS,
  JOB_ADD_FAIL,
  JOB_DELETE_REQUEST,
  JOB_DELETE_SUCCESS,
  JOB_DELETE_FAIL,
  JOB_UPDATE_REQUEST,
  JOB_UPDATE_SUCCESS,
  JOB_UPDATE_FAIL,
  JOB_GET_ALL_REQUEST,
  JOB_GET_ALL_SUCCESS,
  JOB_GET_ALL_FAIL,
  JOB_GETBYSEARCH_FAIL,
    JOB_GETBYSEARCH_REQUEST,
    JOB_GETBYSEARCH_SUCCESS
} from "./jobtypes";
import { addJob as addJobApi, getAllJobs as getAllJobsApi, updateJob as updateJobApi, deleteJob as deleteJobApi } from "../../../API/jobApi";

export const addJob = (newJob) => async (dispatch) => {
  try {
    dispatch({ type: JOB_ADD_REQUEST });
    const data = await addJobApi(newJob); 
    dispatch({ type: JOB_ADD_SUCCESS, payload: data.job });
   return data;
  } catch (error) {
    dispatch({
      type: JOB_ADD_FAIL,
      payload: error.message || "Something went wrong",
    });
  }
};


export const deleteJob = (id) => async (dispatch) => {
  try {
    dispatch({ type: JOB_DELETE_REQUEST });

    await deleteJobApi(id); 
    dispatch({ type: JOB_DELETE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: JOB_DELETE_FAIL,
      payload: error.message || "Something went wrong",
    });
  }
};


export const updateJob = (id, updatedJob) => async (dispatch) => {
  try {
    dispatch({ type: JOB_UPDATE_REQUEST });

    const data = await updateJobApi(id, updatedJob); 
    dispatch({ type: JOB_UPDATE_SUCCESS, payload: data.job });
  } catch (error) {
    dispatch({
      type: JOB_UPDATE_FAIL,
      payload: error.message || "Something went wrong",
    });
  }
};


export const getAllJobs = () => async (dispatch) => {
  try {
    dispatch({ type: JOB_GET_ALL_REQUEST });

    const data = await getAllJobsApi(); 
    dispatch({ type: JOB_GET_ALL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: JOB_GET_ALL_FAIL,
      payload: error.message || "Something went wrong",
    });
  }
};

export const getJobByFilter = (data) => async (dispatch) => {
     try{
      dispatch({type:JOB_GETBYSEARCH_SUCCESS, payload:data});
      

     }catch(error){
      dispatch({type:JOB_GETBYSEARCH_FAIL})
     }
}