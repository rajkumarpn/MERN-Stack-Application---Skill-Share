import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ShowAlert from "../../action/alert";
import PropTypes from "prop-types";
import {RegisterUser} from "../../action/register";
import {Redirect} from 'react-router-dom'

export const Register = (props) => {
  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formdata;

  const onChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      props.ShowAlert("The passwords do not match", "danger");
      return;
    }
    props.RegisterUser({ name, email, password });
  };
  if(props.isAuthenticated!==null){
    return <Redirect to="/dashboard"/>
  }
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="logincontainer shadow d-flex justify-content-center align-items-center">
        <div>
          <h2 className="registertext">Register</h2>
          <div className="form-group inputgroup">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="usr"
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group inputgroup">
            <label>Email:</label>
            <input
              type="text"
              className="form-control"
              name="email"
              id="eml"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group inputgroup">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              id="pwd"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group inputgroup">
            <label>Retype-password:</label>
            <input
              type="password"
              className="form-control"
              id="pwd2"
              name="password2"
              value={password2}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="d-flex justify-content-between btn-container">
            <button
              type="button"
              className="btn btn-outline-warning btnc"
              onClick={(e) => onSubmit(e)}
            >
              Register
            </button>
          </div>
          {/* <div className="d-flex justify-content-between btn-container">
          <button type="button" className="btn btn-outline-info btnc">
            Login
          </button>
        </div> */}
          <p className="redirecttext">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state =>({
  isAuthenticated : state.register.isAuthenticated
});
Register.propTypes = {
  ShowAlert: PropTypes.func.isRequired,
  RegisterUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
export default connect(mapStateToProps, { ShowAlert, RegisterUser })(Register);
