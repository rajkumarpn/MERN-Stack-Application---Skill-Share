import {GET_PROFILE,GET_PROFILE_FAILED,CLEAR_PROFILE,ADD_PROFILE,ADD_PROFILE_FAILED,GET_ALL_PROFILES} from '../action/types'
const initalState = {
    profile:null,
    loading:true,
    error:null,
    allprofiles:[]
}

const ProfileReducer = (state=initalState,action) => {
    const {type,payload} = action;
    switch(type){
        case GET_PROFILE:
        case ADD_PROFILE:
            return{...state,profile:payload,loading:false}
        case GET_PROFILE_FAILED:
        case ADD_PROFILE_FAILED:
            return{...state,error:payload,loading:false}
        case CLEAR_PROFILE:
            return {...state,profile:null,error:null,allprofiles:[]}
        case GET_ALL_PROFILES:
            return {...state,allProfiles:payload,loading:false}
        default:
            return state
    }

}

export default ProfileReducer
