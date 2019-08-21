import {RECEIVE_SESSION_ERRORS, RECEIVE_USER, RESET_ERRORS} from "../../actions/session_actions";
import {CLOSE_MODAL} from '../../actions/modal_actions';

const sessionErrorsReducer = (state = [], action) => {
    switch(action.type){
        case RECEIVE_SESSION_ERRORS:
            return action.errors;
        case RECEIVE_USER:
        case CLOSE_MODAL:
            return [];
        case RESET_ERRORS:
            return [];
        default: 
            return state;
    }
}

export default sessionErrorsReducer;

