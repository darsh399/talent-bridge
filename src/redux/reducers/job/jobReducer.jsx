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

const initialState = {
  jobs: [],
  loading: false,
  error: null,
  job: null,
  searchText: ''
};

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
   
    case JOB_ADD_REQUEST:
    case JOB_DELETE_REQUEST:
    case JOB_UPDATE_REQUEST:
    case JOB_GET_ALL_REQUEST:
    case JOB_GETBYSEARCH_REQUEST:  
      return { ...state, loading: true, error: null };

    case JOB_GETBYSEARCH_SUCCESS: {
      return {...state, loading : false, searchText: action.payload}
    }

    case JOB_ADD_SUCCESS:
      return { ...state, loading: false, jobs: [...state.jobs, action.payload] };

    case JOB_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        jobs: state.jobs.filter((currJob) => currJob._id !== action.payload)
      };

    case JOB_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        jobs: state.jobs.map((currJob) =>
          currJob._id === action.payload._id ? action.payload : currJob
        )
      };

    case JOB_GET_ALL_SUCCESS:
      return { ...state, loading: false, jobs: action.payload };

   
    case JOB_ADD_FAIL:
    case JOB_DELETE_FAIL:
    case JOB_UPDATE_FAIL:
    case JOB_GET_ALL_FAIL:
    case JOB_GETBYSEARCH_FAIL:  
      return { ...state, loading: false, error: action.payload };

   
    default:
      return state;
  }
};

export default jobReducer;
