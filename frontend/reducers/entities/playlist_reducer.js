import {RECEIVE_PLAYLIST, DELETE_PLAYLIST, RECEIVE_PLAYLISTS} from "../../actions/playlist_actions";
import {RECEIVE_PLAYLISTS_TRACKS, DELETE_PLAYLIST_TRACK, ADD_PLAYLIST_TRACK, DELETE_PLAYLIST_TRACKS} from "../../actions/playlist_tracks_actions"
import {merge} from "lodash";
const playlistsReducer = (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_PLAYLISTS:
            const playlists = action.playlists[Object.keys(action.playlists)[0]]
            return merge({}, playlists);
        case RECEIVE_PLAYLIST: 
            return merge({}, state, action.playlist);
        case ADD_PLAYLIST_TRACK:
            let statePlaylist = merge({}, state);
            const selectPlaylistId = Object.keys(action.playlistTrack)[0];
            const trackIds = Object.keys(action.playlistTrack[selectPlaylistId]).map((num) => Number(num))
            statePlaylist[selectPlaylistId].track_ids = trackIds
            return merge({}, statePlaylist)
        // case RECEIVE_PLAYLISTS_TRACKS:
        //     let statePlaylists = merge({}, state);
        //     const eachPlaylists = Object.keys(statePlaylists)
        //     for (let i = 0; i)
        //     return merge({}, state, action.playlistsTracks);
        case DELETE_PLAYLIST:
            let newState = merge({}, state);
            delete newState[Object.keys(action.playlistId)[0]];
            return newState;
        case DELETE_PLAYLIST_TRACK: 
            const playlistId = action.playlistTrack.playlist_id;
            let modifiedTracksIds = merge({}, state);
            const idx = modifiedTracksIds[playlistId].track_ids.indexOf(action.playlistTrack.track_id)
            modifiedTracksIds[playlistId].track_ids.splice(idx, 1)
            return modifiedTracksIds
        case DELETE_PLAYLIST_TRACKS:
            const playlistIdTracks = Object.keys(action.playlistTracks)[0]
            const tracks = Object.keys(action.playlistTracks[playlistIdTracks]);
            let modifiedTracks = merge({}, state);
            modifiedTracks[playlistIdTracks].track_ids = tracks
            return modifiedTracks
        default:
            return state;
    }
}

export default playlistsReducer;