import React from "react";
import {Link} from 'react-router-dom'

export const LandingPage = () => {
  return (
    <div className="landingcontainer">
    <div className="container d-flex justify-content-center align-items-center">
      <div className="maintextcontainer">
      <h1 className="display-1">Skill Share</h1>
      <h4 className="text-muted">Create a Profile/Portfolio, share posts and get help from members</h4>
      <div className="d-flex justify-content-center btn-container">
      <Link className="btn btn-outline-light btnlanding" to="/login">Login</Link>
      <Link className="btn btn-outline-light btnlanding" to="/register" >Register</Link>
      </div>
      </div>
    </div>
    </div>
  );
};

export default LandingPage;
