import React from "react";
import PropTypes from "prop-types";
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {deleteExperience} from '../../action/profile';
import {withRouter} from 'react-router-dom';
import { faTrash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Experiencecontainer = ({ experiences,deleteExperience }) => {
    const Experience = experiences.map(exp=>{
        return <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td><Moment format='DD-MMM-YYYY'>{exp.from}</Moment>{' '}to{' '}
            {exp.current?'Current':<Moment format='DD-MMM-YYYY'>{exp.to}</Moment>}</td>
            <td><button className="btn btn-sm btn-danger" onClick={()=>deleteExperience(exp._id)}><FontAwesomeIcon icon={faTrash} /> Delete</button></td>

        </tr>
    })
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-sm table-responsive">
            <p className="h5 text-info">Work Experience</p>
          <table className="table">
            <thead className="bg-secondary text-light">
              <tr>
                <th scope="col">Company</th>
                <th scope="col">Title</th>
                <th scope="col">Duration</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {Experience}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

Experiencecontainer.propTypes = {
    experiences:PropTypes.array.isRequired,
    deleteExperience:PropTypes.func.isRequired,
};

export default connect(null,{deleteExperience})(withRouter(Experiencecontainer));
