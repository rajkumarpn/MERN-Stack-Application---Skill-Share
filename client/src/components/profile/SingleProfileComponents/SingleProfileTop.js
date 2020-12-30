import React from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckCircle,faMapMarked,faUserTie,faBookmark,faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

const SingleProfileTop = ({
  profile: {
    user: { name },
    status,
    location,
    social,
    bio,
    skills,
  },
}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm">
          <Link to="/developers" className="btn btn-outline-dark m-2"><FontAwesomeIcon icon={faArrowLeft}/> Back to list</Link>
          <div class="card text-center shadow">
            {/* <div class="card-header"><p style={{fontSize:30}}>Profile</p></div> */}
            <div class="card-body">
              <h3 class="card-title text-primary"><FontAwesomeIcon icon={faUserTie}/> {name}</h3>
              <p class="card-text">
                {status}
              </p>
              <h5 className="text-muted"><FontAwesomeIcon icon={faMapMarked}/> {location}</h5>
            </div>
            <div class="card-footer text-default" style={{backgroundColor:"white"}}>
              <h4 className="text-primary">Skills</h4>
                {skills.map(skill => {
                    return <span>{' '}<FontAwesomeIcon icon={faCheckCircle}/>{' '}{skill}</span>
                })}
            </div>
          </div>
          <div class="card text-dark mb-3" style={{maxwidth:'18rem',backgroundColor:"white"}}>
            {/* <div class="card-header" style={{textAlign:"center"}}><h4>Bio</h4></div> */}
            <div class="card-body shadow">
              <p class="card-text text-muted" style={{textAlign:"center",fontSize:20}}><FontAwesomeIcon icon={faBookmark}/> {bio}</p>
            </div>
        </div>
      </div>
    </div></div>
  );
};

SingleProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default SingleProfileTop;
