import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBookReader,faUserTie,faBriefcase,faGraduationCap} from '@fortawesome/free-solid-svg-icons'

const SingleProfileCareer = ({experience,education}) => {
    return (
        <div className="container mt-3" style={{backgroundColor:"white",fontWeight:"bold"}}>
            <div className="row bg-white" style={{backgroundColor:"white"}}>
                <div className="col-sm p-3 bg-white" style={{backgroundColor:"white"}}>
                    <h3 className="text-primary" style={{textAlign:"center"}}><FontAwesomeIcon icon={faBriefcase}/> Work Experience</h3>
                    <div className="shadow d-flex flex-column align-items-center justify-content-center p-3 bg-white border rounded border-default" style={{borderColor:'#ffff',borderWidth:2}}>
                    {experience.length===0?<Fragment><h3>No experience detail to show</h3></Fragment>:
                    <Fragment>{experience.map(exp=>{
                        return <div className="mb-4">
                            <p style={{fontSize:25}}><FontAwesomeIcon icon={faUserTie}/> {exp.company}</p>
                            <p>Position: {exp.title}</p>
                            Duration: <Moment format="DD-MMM-YYYY">{exp.from}</Moment>-{' '}
                            <Moment format="DD-MMM-YYYY">{exp.to}</Moment>
                        </div>
                    })}</Fragment>
                    }
                    </div>
                </div>
                <div className="col-sm p-3">
                <h3 className="text-primary" style={{textAlign:"center"}}><FontAwesomeIcon icon={faGraduationCap}/> Education</h3>
                    <div className="shadow d-flex flex-column align-items-center justify-content-center p-3 bg-white border rounded border-default">
                    {experience.length===0?<Fragment><h3>No education detail to show</h3></Fragment>:
                    <Fragment>{education.map(exp=>{
                        return <div className="mb-4">
                            <p style={{fontSize:25}}><FontAwesomeIcon icon={faBookReader}/> {exp.degree}</p>
                            <p>Institution: {exp.school}</p>
                            Duration: <Moment format="DD-MMM-YYYY">{exp.from}</Moment>-{' '}
                            <Moment format="DD-MMM-YYYY">{exp.to}</Moment>
                        </div>
                    })}</Fragment>
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}


SingleProfileCareer.propTypes = {
    experience:PropTypes.array.isRequired,
    education:PropTypes.array.isRequired,
}

export default SingleProfileCareer
