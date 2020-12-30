import React from "react";
import PropTypes from "prop-types";
import Moment from 'react-moment';
import {deleteEducation} from '../../action/profile';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { faTrash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EducationContainer = ({ educations,deleteEducation,history }) => {
    const Education = educations.map(exp=>{
        return <tr key={exp._id}>
            <td>{exp.school}</td>
            <td>{exp.degree}</td>
            <td><Moment format='DD-MMM-YYYY'>{exp.from}</Moment>{' '}to{' '}
            {exp.current?'Current':<Moment format='DD-MMM-YYYY'>{exp.to}</Moment>}</td>
            <td><button className="btn btn-sm btn-danger" onClick={()=>deleteEducation(exp._id,history)}><FontAwesomeIcon icon={faTrash} /> Delete</button></td>
        </tr>
    })
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-sm table-responsive">
            <p className="h5 text-info">Educational Details</p>
          <table className="table">
            <thead className="bg-secondary text-light">
              <tr>
                <th scope="col">School/College</th>
                <th scope="col">Degree</th>
                <th scope="col">Duration</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {Education}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

EducationContainer.propTypes = {
    educations:PropTypes.array.isRequired,
    deleteEducation:PropTypes.func.isRequired,
};

export default connect(null,{deleteEducation})(withRouter(EducationContainer));
