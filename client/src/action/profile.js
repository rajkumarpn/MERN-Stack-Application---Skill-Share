import {
  GET_PROFILE,
  ADD_PROFILE,
  ADD_PROFILE_FAILED,
  GET_PROFILE_FAILED,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  CLEAR_ACCOUNT,
  GET_ALL_PROFILES
} from "./types.js";
import axios from "axios";
import ShowAlert from "./alert";

export const getProfile = () => async (dispatch) => {
  try {
    console.log(
      `Token from get profile:${axios.defaults.headers.common["x-auth-token"]}`
    );
    const res = await axios.get("http://localhost:5000/api/profile/me");
    console.log(res.data);
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    if (err.response.data.errors) {
      const errors = err.response.data.errors;
      errors.forEach((error) => dispatch(ShowAlert(error.msg, "danger")));
    }
    // dispatch(ShowAlert(err.response.data.msg, "danger"));
    dispatch({ type: GET_PROFILE_FAILED, payload: err.response.data.msg });
  }
};

//@des Add or Edit a Profile

export const addProfile = (profile, history, edit = false) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = axios.post(
      "http://localhost:5000/api/profile",
      profile,
      config
    );
    console.log(res.data)
    dispatch({ type: ADD_PROFILE, payload: res.data });

    dispatch(
      ShowAlert(
        edit ? "Profile edited successfully" : "Profile added successfully",
        "success"
      )
    );
      history.push("/dashboard");
  } catch (err) {
    console.log(err.response.data.errors);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(ShowAlert(error.msg, "danger"));
      });
    }
    dispatch({ type: ADD_PROFILE_FAILED });
  }
};

export const addExperience = (formdata,history) => async dispatch =>{
  const config = {
    headers:{
      'Content-Type':'application/json',
    }
  }

  try {

    const res =await axios.put('http://localhost:5000/api/profile/experience',formdata,config);

    dispatch({type:UPDATE_PROFILE,payload:res.data})

    dispatch(ShowAlert('Experience added to your profile','success'));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach(error=>dispatch(ShowAlert(error.msg,'danger')));
    }
    
  }
};

export const addEducation = (formdata,history) =>async dispatch=>{
      const config = {
        headers:{
          'Content-Type':'application/json',
        }
      }
      try {
        const res = await axios.put('http://localhost:5000/api/profile/education',formdata,config);

        dispatch({type:UPDATE_PROFILE,payload:res.data});

        dispatch(ShowAlert('Educational details updated','success'));
        history.push('/dashboard');
      } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
          errors.forEach(error=>dispatch(ShowAlert(error.msg,'danger')));
        }
      }
}

export const deleteEducation = (id,history) => async dispatch =>{
  try {
    const res = await axios.delete(`http://localhost:5000/api/profile/education/${id}`);

    dispatch({type:UPDATE_PROFILE,payload:res.data})
    dispatch(ShowAlert('Education detail removed successfully','success'));
    history.push("/dashboard");
  } catch (err) {
      dispatch(ShowAlert(err.msg,'danger'));
  }
}

export const deleteExperience = (id,history) =>async dispatch=>{
  try {
    const res = axios.delete(`http://localhost:5000/api/profile/experience/${id}`);

    dispatch({type:UPDATE_PROFILE,payload:res.data});
    dispatch(ShowAlert('Experience removed successfully','success'));
    //history.push("/dashboard");
  } catch (err) {
      dispatch(ShowAlert(err.msg,'danger'))
  }
}

export const deleteProfile = () => async dispatch =>{
  if(window.confirm('Are your sure, you want to permanently remove your account?')){
    try {
      await axios.delete("http://localhost:5000/api/profile");
      dispatch({type:CLEAR_PROFILE});
      dispatch({type:CLEAR_ACCOUNT});
      dispatch(ShowAlert("Account deleted successfully","danger"));
    } catch (err) {
      dispatch(ShowAlert(err.msg,'danger'));
    }
  }
}

//@desc Gets profile of the logged user
export const getMyProfile = () => async dispatch=>{
  try {
    const res = await axios.get("http://localhost:5000/api/profile/me");
    dispatch({type:GET_PROFILE,payload:res.data});
  } catch (err) {
    console.log(err);
    dispatch(ShowAlert(err.msg,'danger'));
  }
}

//@des Gets all profiles
export const getAllProfiles = () => async dispatch=>{
  dispatch({type:CLEAR_PROFILE})
  try {
    const res = await axios.get("http://localhost:5000/api/profile");
    dispatch({type:GET_ALL_PROFILES,payload:res.data});
  } catch (err) {
    console.log(err.msg);
    dispatch(ShowAlert(err.msg,'danger'));
  }
}

//@desc Gets profile by userid
export const getProfileByID = (userid) =>async dispatch=>{
  dispatch({type:CLEAR_PROFILE})
  try {
    const res = await axios.get(`http://localhost:5000/api/profile/${userid}`);
    dispatch({type:GET_PROFILE,payload:res.data});
  } catch (err) {
    console.log(err.msg);
    dispatch(ShowAlert(err.msg,'danger'))
  }
}