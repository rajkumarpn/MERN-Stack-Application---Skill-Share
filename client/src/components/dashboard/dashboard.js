import React,{Fragment, useEffect} from "react";
import {connect} from 'react-redux';
import {getProfile} from '../../action/profile';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Dashboardactions from './dashboardactions';
import { faUser,faTrash} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Experiencecontainer from './experiencecontainer';
import EducationContainer from './educationcontainer';
import {deleteProfile} from '../../action/profile';
import {withRouter} from 'react-router-dom'


const Dashboard = ({getProfile,user,profile,deleteProfile}) => {
  useEffect(()=>{
        getProfile();
  },[])

    return(
      user!==null&&!profile.loading?
      <div className="container shadow p-4 mt-2">
      <div className="row">
        <div className="col-sm">
      <p className="display-5 text-info">Dashboard</p>
      <p className="h5"><FontAwesomeIcon icon={faUser} /> Welcome {user.name}</p>
      <hr/>
      {profile.profile===null?<Link to='/create-profile' className="btn btn-info text-light">Create a Profile</Link>
      :    
      profile.profile&&!profile.loading?<Fragment>
      <Dashboardactions/>
      {profile.profile.experience.length>0?<Experiencecontainer experiences={profile.profile.experience} />:null}
      {profile.profile.education.length>0?<EducationContainer educations={profile.profile.education}/>:null}
        </Fragment>:<div class="spinner-grow text-info" role="status"><span class="sr-only">Loading...</span></div>
      }
      <button className="btn btn-danger btn-md text-light m-4" onClick={()=>deleteProfile()}><FontAwesomeIcon icon={faTrash} /> Delete Profile</button>
      </div>
      </div>
      </div>
      :null
      
    )
};


const mapStateToProps = state =>({
      user:state.register.user,
      profile:state.profile,

});

Dashboard.propTypes={
  getProfile:PropTypes.func.isRequired,
  user:PropTypes.object.isRequired,
  profile:PropTypes.object.isRequired,
  deleteProfile:PropTypes.func.isRequired,
}


export default connect(mapStateToProps,{getProfile,deleteProfile})(Dashboard);
