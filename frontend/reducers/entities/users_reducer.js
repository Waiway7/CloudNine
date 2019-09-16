import {merge} from "lodash";
import {RECEIVE_ALL_USERS, RECEIVE_USER} from '../../actions/user_actions';



const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_ALL_USERS:
            return merge({}, action.users);
        default: 
            return state;
    }
}

export default usersReducer;