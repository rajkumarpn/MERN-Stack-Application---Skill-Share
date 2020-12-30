import React,{Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getsinglepost} from '../../../action/post'
import Post from '../post'
import Comments from './comments'
import CreateComment from './createcomment'
const SinglePost = ({getsinglepost,match,post:{post,loading},register}) => {
    useEffect(()=>{
        getsinglepost(match.params.id);
    },[getsinglepost,match])
    return (
        loading&&post===null?<Fragment><div class="spinner-border text-info" role="status">
        <span class="sr-only"></span>
        </div></Fragment>:
        <Fragment>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-sm">
            <Post post={post} showbuttons={false} register={register}/>
            <CreateComment postid={match.params.id}/>
            {post.comments&&<Comments comments={post.comments} postid={match.params.id} />}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = state =>({
    post:state.post,
    register:state.register
})

SinglePost.propTypes = {
    getsinglepost:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired,
    register:PropTypes.object.isRequired,
}

export default connect(mapStateToProps,{getsinglepost})(SinglePost)
