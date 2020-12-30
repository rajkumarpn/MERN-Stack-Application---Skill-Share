import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
//@Alert types danger,success,warning,info,light,dark,primary
const Alert = ({alerts=null}) =>alerts!==null&&alerts.length>0&&alerts.map(alert=>(<div className="alert-custom"><div className={`alert alert-${alert.alertType}`} role="alert" key={alert.id}>
{alert.msg}
</div></div>));

Alert.propTypes={
    alerts:PropTypes.array.isRequired
};

const mapStateToProps=(state)=>({
    alerts:state.alert
});



export default connect(mapStateToProps)(Alert);