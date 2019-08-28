import {RECEIVE_PLAYLIST, DELETE_PLAYLIST, RECEIVE_PLAYLISTS} from "../../actions/playlist_actions";
import {merge} from "lodash";
const playlistsReducer = (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_PLAYLISTS:
            return merge({}, action.playlists);
        case RECEIVE_PLAYLIST: 
            return merge({}, state, action.playlist);
        case DELETE_PLAYLIST:
            let newState = merge({}, state);
            delete newState[action.playlistId];
            return newState;
        default:
            return state;
    }
}

export default playlistsReducer;