import {
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  LOAD_USER,
  AUTH_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from "../action/types";
import axios from "axios";
import ShowAlert from "./alert";
import setAuth from "../utils/setAuth";


//@desc Checked if token is valid and loads user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuth(localStorage.token);
  }
  try {
    const res = await axios.get("http://localhost:5000/api/auth");
    dispatch({ type: LOAD_USER, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_FAILED });
  }
};

//@desc Registers user and sets token in local storage
export const RegisterUser = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post(
      "http://localhost:5000/api/users",
      body,
      config
    );
    dispatch({ type: REGISTRATION_SUCCESS, payload: { token: res.data } });
  } catch (err) {
    // console.log(err.response.data);
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(ShowAlert(error.msg, "danger")));
    }
    dispatch({ type: REGISTRATION_FAILED });
  }
};

export const LoginUser = (email,password) => async dispatch =>{
    const config = {
        headers:{
            'Content-Type':'application/json'
        }
    }

    const body = JSON.stringify({email,password})

    try {
        const res = await axios.post('http://localhost:5000/api/auth',body,config);
        setAuth(res.data);
        dispatch(loadUser())
        dispatch({type:LOGIN_SUCCESS,payload:{token:res.data}});
        
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach((error)=>{
            dispatch(ShowAlert(error.msg,'danger'))
            });
        }else{
          dispatch(ShowAlert(err.response.data[0].errors,'danger'))
        }
        dispatch({type:LOGIN_FAIL});
      }
    }

    export const logout = () =>dispatch=>{
      dispatch({type:LOGOUT})
      dispatch({type:CLEAR_PROFILE})
    }
