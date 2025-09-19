import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_FETCH_ALL_REQUEST,
  USER_FETCH_ALL_SUCCESS,
  USER_FETCH_ALL_FAIL,
  USER_FETCH_BY_ID_REQUEST,
  USER_FETCH_BY_ID_SUCCESS,
  USER_FETCH_BY_ID_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_CHANGE_PASSWORD_REQUEST,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_CHANGE_PASSWORD_FAIL,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
  USER_VERIFY_OTP_REQUEST,
  USER_VERIFY_OTP_SUCCESS,
  USER_VERIFY_OTP_FAIL,
  USER_SET_NEW_PASSWORD_REQUEST,
  USER_SET_NEW_PASSWORD_SUCCESS,
  USER_SET_NEW_PASSWORD_FAIL,
  USER_CREATE_FAIL,
  USER_CREATE_SUCCESS,
  USER_CREATE_REQUEST,
  USER_ACTIVATE_FAIL,
  USER_ACTIVATE_REQUEST,
  USER_ACTIVATE_SUCCESS,
  USER_DEACTIVATE_FAIL,
  USER_DEACTIVATE_REQUEST,
  USER_DEACTIVATE_SUCCESS,
} from "./types";

const initialState = {
  user: null,
  users: [],
  loading: false,
  error: null,
  message: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  
    case USER_CREATE_REQUEST:
    case USER_REGISTER_REQUEST:
    case USER_LOGIN_REQUEST:
    case USER_FETCH_ALL_REQUEST:
    case USER_FETCH_BY_ID_REQUEST:
    case USER_UPDATE_REQUEST:
    case USER_DELETE_REQUEST:
    case USER_CHANGE_PASSWORD_REQUEST:
    case USER_FORGOT_PASSWORD_REQUEST:
    case USER_VERIFY_OTP_REQUEST:
    case USER_SET_NEW_PASSWORD_REQUEST:
    case USER_ACTIVATE_REQUEST:
    case USER_DEACTIVATE_REQUEST:
      return { ...state, loading: true, error: null, message: null };

    case USER_CREATE_SUCCESS:
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        users: [...state.users, action.payload],
      };

    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload };

    case USER_LOGOUT:
      return { ...state, user: null, message: null, error: null };

    case USER_FETCH_ALL_SUCCESS:
      return { ...state, loading: false, users: action.payload };

    case USER_FETCH_BY_ID_SUCCESS:
      return { ...state, loading: false, user: action.payload };

    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        users: state.users.map((currUser) =>
          currUser._id === action.payload._id ? action.payload : currUser
        ),
      };

    case USER_DEACTIVATE_SUCCESS:
    case USER_ACTIVATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        users: state.users.map((u) =>
          u._id === action.payload._id ? action.payload : u
        ),
        user:
          state.user && state.user._id === action.payload._id
            ? action.payload
            : state.user,
      };

    case USER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: state.user && state.user._id === action.payload._id ? null : state.user,
        users: state.users.filter((u) => u._id !== action.payload._id),
      };

    case USER_CHANGE_PASSWORD_SUCCESS:
    case USER_FORGOT_PASSWORD_SUCCESS:
    case USER_VERIFY_OTP_SUCCESS:
    case USER_SET_NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message || "Action completed successfully",
      };

    
    case USER_CREATE_FAIL:
    case USER_REGISTER_FAIL:
    case USER_LOGIN_FAIL:
    case USER_FETCH_ALL_FAIL:
    case USER_FETCH_BY_ID_FAIL:
    case USER_UPDATE_FAIL:
    case USER_DELETE_FAIL:
    case USER_CHANGE_PASSWORD_FAIL:
    case USER_FORGOT_PASSWORD_FAIL:
    case USER_VERIFY_OTP_FAIL:
    case USER_SET_NEW_PASSWORD_FAIL:
    case USER_ACTIVATE_FAIL:
    case USER_DEACTIVATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default userReducer;
