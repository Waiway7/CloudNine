import {merge} from "lodash";
import {RECEIVE_USER, LOGOUT_USER} from '../../actions/session_actions';


const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_USER:
            return merge({}, state, {[action.user.id]: action.user});
        case LOGOUT_USER:
            return {}
        default: 
            return state;
    }
}

export default usersReducer;