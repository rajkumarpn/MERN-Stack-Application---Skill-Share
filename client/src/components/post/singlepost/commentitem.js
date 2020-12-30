import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Moment from 'react-moment'
import {deleteComment} from '../../../action/post'

const Commentitem = ({comment,register,deleteComment,postid}) => {
    console.log(postid)
    const id = {
        postid:postid,
        commentid:comment._id
    }
    return (
            <div className="container mb-2">
                <div className="row">
                    <div className="col-sm">
                    <div class="card shadow" style={{maxwidth: '30rem'}}>
                        <div class="card-body">
                            <h5 class="card-title text-primary">{comment.name}</h5>
                            <h6 class="card-subtitle mb-2 text-muted"><Moment format="DD-MMM-YYYY">{comment.date}</Moment> </h6>
                            <p class="card-text">{comment.text}</p>
                            {register.user&&register.user._id===comment.user?<button className="btn btn-sm btn-danger" onClick={()=>deleteComment(id)}>{' '} Delete Comment</button>:null}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

const mapStateToProps = state =>({
    register:state.register
})
Commentitem.propTypes = {
    comment:PropTypes.object.isRequired,
    register:PropTypes.object.isRequired,
    deleteComment:PropTypes.func.isRequired,
    postid:PropTypes.any.isRequired,
}

export default connect(mapStateToProps,{deleteComment})(Commentitem)
