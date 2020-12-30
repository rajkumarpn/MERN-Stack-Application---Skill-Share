import {
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  LOAD_USER,
  AUTH_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ACCOUNT
} from "../action/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  user: null,
  loading: true,
};

const RegisterReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USER:
      return { ...state, isAuthenticated: true, user: payload, loading: false };
    case REGISTRATION_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token.toString());
      return { ...state, ...payload, isAuthenticated: true, loading: false };
    case REGISTRATION_FAILED:
    case AUTH_FAILED:
    case LOGIN_FAIL:
    case LOGOUT:
    case CLEAR_ACCOUNT:
      localStorage.removeItem("token");
      return {
        ...state,
        token:null,
        loading:false,
        isAuthenticated:null
      };
    default:
      return state;
  }
};

export default RegisterReducer;
