    import React,{Fragment, useEffect} from 'react';
    import PropTypes from 'prop-types';
    import {connect} from 'react-redux';
    import {getProfileByID} from '../../action/profile';
    import SingleProfileTop from './SingleProfileComponents/SingleProfileTop'
    import SingleProfileCareer from './SingleProfileComponents/SingleProfileCareer'
    import {Link} from 'react-router-dom'

    const SingleProfile = ({
        profile:{profile,loading},
        match,
        getProfileByID,
        register
    }) => {
        useEffect(() => {
            getProfileByID(match.params.id)
        }, [getProfileByID,match])
        return (
            profile===null||loading?<Fragment><div className="d-flex justify-content-center align-items-center mt-4"><div class="spinner-border text-info" role="status"><span className="sr-only"></span>
        </div></div></Fragment>:
        <Fragment>
            {
                register.user!==null&&profile.user._id===register.user._id?<Fragment><div className="d-flex justify-content-end m-3"><Link to="/edit-profile" className="btn btn-outline-warning">Edit Profile</Link></div></Fragment>:null
            }
            <SingleProfileTop profile={profile}/>
            <SingleProfileCareer experience={profile.experience} education={profile.education} />
        </Fragment>
        )
    }

    const mapStateToProps = state =>({
        profile:state.profile,
        register:state.register
    });

    SingleProfile.propTypes = {
        getProfileByID:PropTypes.func.isRequired,
        profile:PropTypes.object.isRequired,
        register:PropTypes.object.isRequired,
    }

    export default connect(mapStateToProps,{getProfileByID})(SingleProfile)
