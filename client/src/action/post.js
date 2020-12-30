import {LOAD_PROFILES,PROFILE_ERROR,LIKE_ERROR,ADD_POST,POST_ERROR,DELETE_POST,GET_POST,ADD_COMMENT,DELETE_COMMENT} from './types';
import axios from 'axios';
import ShowAlert from './alert'

export const loadProfiles = () =>async dispatch=>{
    try {
        const res = await axios.get("http://localhost:5000/api/posts");
        dispatch({type:LOAD_PROFILES,payload:res.data});
        
    } catch (err) {
        dispatch({type:PROFILE_ERROR,payload:err.response});
    }
}

export const likePost = (id) =>async dispatch=>{
    try {
        await axios.put(`http://localhost:5000/api/posts/like/${id}`);
        dispatch(loadProfiles());

    } catch (err) {
        dispatch({type:LIKE_ERROR,payload:err.response.msg})
    }
}

export const unlikePost = (id) => async dispatch=>{
    try {
        await axios.put(`http://localhost:5000/api/posts/unlike/${id}`);
        dispatch(loadProfiles());
        
    } catch (err) {
        dispatch({type:LIKE_ERROR,payload:err.response.msg})
        
    }
}

export const addPost = (text) => async dispatch=>{
    const body = {
        text
    }
    const config = {
        heders:{
            'Content-Type':'application/json'
        }
    }
    try {
        const res = await axios.post("http://localhost:5000/api/posts",body,config);
        console.log(res.data)
        dispatch({type:ADD_POST,payload:res.data});
        dispatch(ShowAlert('Post created','success'))
    } catch (err) {
        dispatch({type:POST_ERROR,payload:err.response})
    }
}

export const deletePost = (id) =>async dispatch=>{
    try {
        await axios.delete(`http://localhost:5000/api/posts/${id}`);
        dispatch({type:DELETE_POST,payload:id});
    } catch (err) {
        dispatch({type:POST_ERROR,payload:err.response})
    }
}

export const getsinglepost = (id) => async dispatch=>{
    try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        dispatch({type:GET_POST,payload:res.data});
    } catch (err) {
        dispatch({type:POST_ERROR,payload:err.response.statusText})
        
    }
}

export const addComment = ({text,postid}) => async dispatch=>{
    const body = {
        text
    }
    const config = {
        heders:{
            'Content-Type':'application/json'
        }
    }
    try {
        const res = await axios.put(`http://localhost:5000/api/posts/comments/${postid}`,body,config);
        console.log(res.data)
        dispatch({type:ADD_COMMENT,payload:res.data});
        dispatch(ShowAlert('Comment added','success'))
    } catch (err) {
        dispatch({type:POST_ERROR,payload:err.response})
    }

}

export const deleteComment = (id) =>async dispatch=>{
    console.log(id)
    try {
        const res = await axios.delete(`http://localhost:5000/api/posts/comments/${id.postid}/${id.commentid}`);
        dispatch({type:DELETE_COMMENT,payload:id.commentid});
        dispatch(ShowAlert('Comment Removed','success'));
    } catch (err) {
        dispatch({type:POST_ERROR,payload:err.response})
    }
}