import {RECEIVE_TRACK, REMOVE_TRACK, RECEIVE_USER_LIBRARY} from "../../actions/track_actions";
import {merge} from "lodash";
import {LOGOUT_USER} from "../../actions/session_actions";

const tracksReducer = (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_USER_LIBRARY:
            return merge({}, action.tracks)
        case RECEIVE_TRACK: 
            return merge({}, state, {[action.track.id]: action.track});
        case REMOVE_TRACK:
            let newState = merge({}, state);
            delete newState[action.trackId];
            return newState;
        case LOGOUT_USER:
            return {}
        default:
            return state;
    }
}

export default tracksReducer;