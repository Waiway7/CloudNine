import {RECEIVE_CURRENT_AUDIO, REMOVE_AUDIO} from '../../actions/user_actions';
import {merge} from 'lodash'

export default (state = {}, action) => {
    Object.freeze(state)
    switch (action.type){
        case RECEIVE_CURRENT_AUDIO:
            return {audio: action.track, info: action.trackInfo};
        default:
            return state;
    }
}