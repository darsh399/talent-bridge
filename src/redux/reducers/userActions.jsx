import {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUserById,
  changePassword,
  forgotPassword,
  verifyOtp,
  setNewPassword,
  createUser,
  activateUser,
  suspendUser
} from "../../API/userApi";

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
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_ACTIVATE_FAIL,
  USER_ACTIVATE_REQUEST,
  USER_ACTIVATE_SUCCESS,
  USER_DEACTIVATE_FAIL,
  USER_DEACTIVATE_REQUEST,
  USER_DEACTIVATE_SUCCESS
} from "./types";

export const addUserAction = (userData) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });
  try {
    const data = await registerUser(userData);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data.user });
    return data;
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message || error });
  }
};

export const loginUserAction = (credentials) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });
  try {
    const data = await loginUser(credentials);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user });
    return data;
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.message || error });
  }
};



export const logoutUserAction = () => async (dispatch) => {
  try {
    const res = await logoutUser();
    dispatch({ type: USER_LOGOUT });
     return res;  
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export const fetchAllUserAction = () => async (dispatch) => {
  dispatch({ type: USER_FETCH_ALL_REQUEST });
  try {
    const data = await getAllUsers();
    dispatch({ type: USER_FETCH_ALL_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: USER_FETCH_ALL_FAIL, payload: error.message || error });
  }
};

export const getUserByIDAction = (id) => async (dispatch) => {
  dispatch({ type: USER_FETCH_BY_ID_REQUEST });
  try {
    const data = await getUserById(id);
    dispatch({ type: USER_FETCH_BY_ID_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_FETCH_BY_ID_FAIL, payload: error.message || error });
  }
};

export const updateUserAction = (id, newData) => async (dispatch) => {
  dispatch({ type: USER_UPDATE_REQUEST });
  try {
     const data = await updateUser(id, newData);
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data.user });
     return data;
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message || error });
  }
};

export const deleteUserAction = (id, password) => async (dispatch) => {
  dispatch({ type: USER_DELETE_REQUEST });
  try {
    await deleteUserById(id, password);
    dispatch({ type: USER_DELETE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: USER_DELETE_FAIL, payload: error.message || error });
  }
};

export const changePasswordAction = (data) => async (dispatch) => {
  dispatch({ type: USER_CHANGE_PASSWORD_REQUEST });
  try {
    const res = await changePassword(data);
    dispatch({ type: USER_CHANGE_PASSWORD_SUCCESS, payload: res.message });
  } catch (error) {
    dispatch({ type: USER_CHANGE_PASSWORD_FAIL, payload: error.message || error });
  }
};

export const forgotPasswordAction = (data) => async (dispatch) => {
  dispatch({ type: USER_FORGOT_PASSWORD_REQUEST });
  try {
    const res = await forgotPassword(data);
    dispatch({ type: USER_FORGOT_PASSWORD_SUCCESS, payload: res.message });
  } catch (error) {
    dispatch({ type: USER_FORGOT_PASSWORD_FAIL, payload: error.message || error });
  }
};

export const verifyOtpAction = (data) => async (dispatch) => {
  dispatch({ type: USER_VERIFY_OTP_REQUEST });
  try {
    const res = await verifyOtp(data);
    dispatch({ type: USER_VERIFY_OTP_SUCCESS, payload: res.message });
  } catch (error) {
    dispatch({ type: USER_VERIFY_OTP_FAIL, payload: error.message || error });
  }
};

export const setNewPasswordAction = (data) => async (dispatch) => {
  dispatch({ type: USER_SET_NEW_PASSWORD_REQUEST });
  try {
    const res = await setNewPassword(data);
    dispatch({ type: USER_SET_NEW_PASSWORD_SUCCESS, payload: res.message });
  } catch (error) {
    dispatch({ type: USER_SET_NEW_PASSWORD_FAIL, payload: error.message || error });
  }
};

export const userDeactivate = (id) =>async (dispatch) =>{
  try{
      dispatch({type: USER_DEACTIVATE_REQUEST});
      const res = await suspendUser(id);
       console.log('afteer deactivate activate', id)
      dispatch({type: USER_DEACTIVATE_SUCCESS, payload:res});
  }catch(error){
    dispatch({type: USER_DEACTIVATE_FAIL})
  }
}

export const userActivate = (id) => async (dispatch) => {
  try{
    console.log('before activate')
    dispatch({type: USER_ACTIVATE_REQUEST});
    const res = await activateUser(id);
     console.log('after activate')
    dispatch({type: USER_ACTIVATE_SUCCESS, payload: res})

  }catch(error){
    dispatch({type: USER_ACTIVATE_FAIL});
  }
}


export const createUserData = (id, newData) => async(dispatch)=> {
  try{
        dispatch({type: USER_CREATE_REQUEST});
        const res = await createUser(id, newData);
        dispatch({type: USER_CREATE_SUCCESS, payload: newData})
  }catch(error){
    dispatch({type: USER_CREATE_FAIL, payload:error.message || error});
  }

}