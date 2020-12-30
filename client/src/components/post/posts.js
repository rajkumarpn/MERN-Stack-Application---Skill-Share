import React,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {loadProfiles} from '../../action/post'
import Post from './post'
import CreatePost from './createPost'

const Posts = ({loadProfiles,post:{posts,loading}}) => {
    useEffect(()=>{
        loadProfiles();
    },[loadProfiles])
    return (
        loading?<Fragment><div class="spinner-border text-info" role="status"><span class="sr-only"></span></div></Fragment>
        :
        <Fragment>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-sm">
            <h3 className="text-primary">Community Posts</h3>
                    <CreatePost/>
                    </div>
                </div>
            </div>
            {
                posts.map(post=>{
                    return <Post key={post._id} post={post}/>
                })
            }
        </Fragment>
    )
}

const mapStateToProps = state =>({
    post:state.post
})
Posts.propTypes = {
    loadProfiles:PropTypes.func.isRequired,
    post:PropTypes.object.isRequired,
}

export default connect(mapStateToProps,{loadProfiles})(Posts)
