import {RECEIVE_PLAYLISTS_TRACKS, RECEIVE_PLAYLIST_TRACKS, DELETE_PLAYLIST_TRACK} from "../../actions/playlist_tracks_actions";
import {merge} from "lodash";
const playlistsTracksReducer = (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_PLAYLISTS_TRACKS:
            debugger
            return merge({}, action.playlistsTracks);
        default:
            return state;
    }
}

export default playlistsTracksReducer;