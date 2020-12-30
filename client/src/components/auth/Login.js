import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {LoginUser} from '../../action/register';
import PropTypes from "prop-types";
import { Register } from './Register';
import {Redirect} from 'react-router-dom'

export const Login = (props) => {
    const [formdata, setFormData] = useState({
        email:'',
        password:''
    });
    
    const {email,password} = formdata;
    
    const onChange = e =>{
        setFormData({...formdata,[e.target.name]:e.target.value})
    }
    
    const onSubmit = e =>{
        e.preventDefault();
        props.LoginUser(email,password);
    }
    if(props.isAuthenticated!==null){
      return <Redirect to="/dashboard" />
    }
    return (
        <div className="d-flex row justify-content-center align-items-center">
      <div className="logincontainer col-sm-4 shadow d-flex justify-content-center align-items-center">
          <div>
        <h2 className="registertext">Login</h2>
        <div className="form-group inputgroup">
          <label >Email:</label>
          <input 
          type="text" 
          className="form-control" 
          name="email" 
          id="eml" 
          value={email}
          onChange={e=>onChange(e)}
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
          onChange={e=>onChange(e)}
          required
          />
        </div>
        <div className="d-flex justify-content-between btn-container">
          <button type="button" className="btn btn-outline-info btnc" onClick={e=>onSubmit(e)}>
            Login
          </button>
        </div>
        {/* <div className="d-flex justify-content-between btn-container">
          <button type="button" className="btn btn-outline-warning btnc" >
            Register
          </button> 
        </div>*/}
        <p className="redirecttext">Are you a new user? <Link to="/register">Register here</Link></p>
        </div>
      </div>
      </div>
    )
}

const mapStateToProps = state =>({
  isAuthenticated:state.register.isAuthenticated
})

Register.propTypes={
  LoginUser:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool.isRequired,
}

export default connect(mapStateToProps,{LoginUser})(Login);
