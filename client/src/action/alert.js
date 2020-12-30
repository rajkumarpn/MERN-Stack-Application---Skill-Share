import {SET_ALERT,REMOVE_ALERT} from './types';
import {v4 as uuidv4} from 'uuid';

const ShowAlert = (msg,alertType) => dispatch =>{
    const id = uuidv4();
    dispatch({type:SET_ALERT,payload:{id,msg,alertType}});

    setTimeout(()=>{dispatch({type:REMOVE_ALERT,payload:id})},3000);
}

export default ShowAlert;