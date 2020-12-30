import React from 'react'
import { faSchool,faAddressCard,faBriefcase} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from 'react-router-dom';

export const Dashboardactions = () => {
    return (
    <div className="container">
        <div className="row">
            <div className="col-sm">
            <Link type="button" className="btn btn-outline-secondary m-2 btn-sm dash-btn" to="/edit-profile"><FontAwesomeIcon icon={faAddressCard} /> Edit Profile</Link>
            <Link type="button" className="btn btn-outline-secondary m-2 btn-sm dash-btn" to="/add-education"><FontAwesomeIcon icon={faSchool} /> Add Education</Link>
            <Link type="button" className="btn btn-outline-secondary m-2 btn-sm dash-btn" to="/add-experience"><FontAwesomeIcon icon={faBriefcase} /> Add Work Experience</Link>
            </div>
        </div>
        </div>
    )
}

export default Dashboardactions
