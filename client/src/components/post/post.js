import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons'
import {faThumbsDown} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux';
import {likePost,unlikePost,deletePost} from '../../action/post'
import {Link} from 'react-router-dom'

const Post = ({post,likePost,unlikePost,register,deletePost,showbuttons}) => {
    return (
        <div className="container mb-2">
            <div className="row">
                <div className="col-sm">
                <div class="card shadow" style={{maxwidth: '30rem'}}>
                    <div class="card-body">
                        <h5 class="card-title text-primary">Post by {post.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Posted on <Moment format="DD-MMM-YYYY">{post.date}</Moment> </h6>
                        <p class="card-text">{post.text}</p>
                        {showbuttons?<Fragment>
                        <span className="btn" onClick={()=>likePost(post._id)}><FontAwesomeIcon icon={faThumbsUp}/> {post.likes.length>0&&post.likes.length} {' '}</span>
                        <span className="btn" onClick={()=>unlikePost(post._id)}><FontAwesomeIcon icon={faThumbsDown}/></span>
                        <Link to={`/posts/${post._id}`} class="card-link" className="btn btn-sm btn-primary">Discussions {post.comments.length>0&&post.comments.length}</Link>{' '}
                        {register.user&&register.user._id===post.user?<button className="btn btn-sm btn-danger" onClick={()=>deletePost(post._id)}>{' '} Delete Post</button>:null}
                        </Fragment>:null
                        }
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
Post.defaultProps={
    showbuttons:true
}
Post.propTypes = {
    post:PropTypes.object.isRequired,
    likePost:PropTypes.func.isRequired,
    unlikePost:PropTypes.func.isRequired,
    deletePost:PropTypes.func.isRequired,
}

export default connect(mapStateToProps,{likePost,unlikePost,deletePost})(Post)
