import React from 'react'
import PropTypes from 'prop-types'
import {Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const Privateroute = ({register,component:Component,...rest}) => (

        <Route {...rest} render={props=>
            register.isAuthenticated===null&&!register.loading?<Redirect to="/login"/>:<Component {...props}/>} />

);

const mapStateToProps = state =>({
    register:state.register,
});

Privateroute.propTypes = {
register:PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Privateroute)
