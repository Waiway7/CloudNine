import {RECEIVE_LIBRARY} from '../../actions/user_actions';
import {merge} from 'lodash'

export default (state = [], action) => {
    Object.freeze(state)
    switch (action.type){
        case RECEIVE_LIBRARY:
            return action.library
        default:
            return state
    }
}