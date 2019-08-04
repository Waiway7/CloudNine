import entities from './entities/entities_reducer';
import errors from './errors/session_errors_reducer';
import session from './session/session_reducer'
import ui from './ui/ui_reducer'
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    entities,
    errors,
    session,
    ui
});

export default rootReducer;