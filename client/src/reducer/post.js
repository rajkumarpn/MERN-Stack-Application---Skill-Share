import {LOAD_PROFILES,PROFILE_ERROR,ADD_POST,DELETE_POST,GET_POST,ADD_COMMENT,DELETE_COMMENT} from '../action/types'
const initialState = {
    posts:[],
    post:null,
    loading:true,
    error:null
}

const PostReducer = (state=initialState,action) => {
    const {payload,type} = action
    switch(type){
        case LOAD_PROFILES:{
            return {...state,posts:payload,loading:false}
        }
        case PROFILE_ERROR:{
            return {...state,error:payload,loading:false}
        }
        case ADD_POST:{
            return {...state,posts:[...state.posts,payload],loading:false}
        }
        case DELETE_POST:{
            return {...state,posts:state.posts.filter(post=>post._id!==payload),loading:false}
        }
        case GET_POST:{
            return {...state,post:payload,loading:false}
        }
        case ADD_COMMENT:{
            return {...state,post:{...state.post,comments:payload},loading:false}
        }
        case DELETE_COMMENT:{
            return {...state,post:{...state.post,comments:state.post.comments.filter(comment=>comment._id!==payload)},loading:false}
        }
        default:{
            return state
        }
    }
}

export default PostReducer
