import {combineReducers} from 'redux';
import alertReducer from './alert'
import RegisterReducer from './register'
import ProfileReducer from './profile'
import PostReducer from './post'

const RootReducer = combineReducers({
    alert:alertReducer,
    register:RegisterReducer,
    profile:ProfileReducer,
    post:PostReducer
});

export default RootReducer;