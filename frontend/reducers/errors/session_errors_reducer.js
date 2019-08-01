import {RECEIVE_SESSION_ERRORS, RECEIVE_USER} from "../../actions/session_actions";
import {CLOSE_MODAL} from '../../actions/modal_actions';

const sessionErrorsReducer = (state = [], action) => {
    switch(action.type){
        case RECEIVE_SESSION_ERRORS:
            return action.errors;
        case RECEIVE_USER:
        case CLOSE_MODAL:
            return [];
        default: 
            return state;
    }
}

export default sessionErrorsReducer;

