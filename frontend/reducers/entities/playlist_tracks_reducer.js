import {RECEIVE_PLAYLISTS_TRACKS, ADD_PLAYLIST_TRACK, DELETE_PLAYLIST_TRACK, DELETE_PLAYLIST_TRACKS} from "../../actions/playlist_tracks_actions";
import {DELETE_PLAYLIST} from "../../actions/playlist_actions"
import {merge} from "lodash";
const playlistsTracksReducer = (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_PLAYLISTS_TRACKS:
            return merge({}, action.playlistsTracks);
        case ADD_PLAYLIST_TRACK:
            return merge({}, state, action.playlistTrack);
        case DELETE_PLAYLIST_TRACK:
            let newState = merge({}, state);
            const playlist = action.playlistTrack;
            delete newState[playlist.playlist_id][playlist.track_id];
            return newState
        case DELETE_PLAYLIST_TRACKS: 
            return Object.assign({}, state, action.playlistTracks)
        case DELETE_PLAYLIST:
            let playlistState = merge({}, state);
            delete playlistState[Object.keys(action.playlistId)[0]];
            return playlistState
        default:
            return state;
    }
}

export default playlistsTracksReducer;