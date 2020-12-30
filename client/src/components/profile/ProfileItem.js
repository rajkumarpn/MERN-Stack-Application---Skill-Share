import React from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck,faUser,faMapMarkedAlt,faUserTie} from '@fortawesome/free-solid-svg-icons'

const ProfileItem = ({profile:{
        _id,
        skills,
        user,
        company,
        location,
        status
        }}) => {
    return (
        <div className="container">
            <div className="row">
            <div className="col-sm">
                {/* <div className="row border rounded shadow mb-3">
                    <div className="col-sm p-4">
                        <h3 className="text-info">
                            {user.name}
                        </h3>
                        <span style={{fontSize:24,fontFamily:"sans-serif"}}>{status} {company?<span style={{fontSize:18,fontFamily:"sans-serif"}}> at {company}</span>:null}</span>
                        <h5>
                            {location}
                        </h5>
                        <Link to={`/profile/${_id}`} className="btn btn-md btn-info text-light">
                            View Profile
                        </Link>
                    </div>
                    <div className="col-sm p-4">
                        {
                            skills.map((skill,index)=>{
                                return <p key={index} className="text-info"><FontAwesomeIcon icon={faCheck}/> {skill}</p>
                            })
                        }
                    </div>
                </div> */}
                    <div className="card bg-light mb-3 shadow" style={{maxWidth: '50rem'}}>
                    <div className="card-header text-light bg-dark"><h3><FontAwesomeIcon icon={faUser}/> {user.name}</h3></div>
                    <div className="card-body">
                    <h5 className="card-title"><span style={{fontWeight:"bolder"}}>{company}</span>-{' '}<span className="text-muted"><FontAwesomeIcon icon={faMapMarkedAlt}/> {location}</span></h5>
                    <p className="card-text"><FontAwesomeIcon icon={faUserTie}/> {status}</p>
                        {
                            skills.map((skill,index)=>{
                                return <span key={index} className="text-info"><FontAwesomeIcon icon={faCheck}/> {skill} {' '}</span>
                            })
                        }
                        <br/>
                        <Link to={`/profile/${_id}`} className="btn btn-md btn-info text-light mt-3">
                            View Profile
                        </Link>
                </div>
                </div>
            </div>
        </div>
    </div>
    )
}

ProfileItem.propTypes = {
    profile:PropTypes.object.isRequired,
}

export default ProfileItem
