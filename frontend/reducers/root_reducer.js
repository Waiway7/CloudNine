import entities from './entities/users_reducer';
import errors from './errors/session_errors_reducer';
import session from './session/session_reducer'
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    entities,
    errors,
    session
});

export default rootReducer;