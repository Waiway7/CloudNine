import {RECEIVE_PLAY, RECEIVE_PAUSE, RECEIVE_NEXT_TRACK} from '../../actions/user_actions';
import {merge} from 'lodash';

export default (state = null, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_PLAY:
            return true;
        case RECEIVE_PAUSE:
            return false;
        default: 
            return state;
    }
}