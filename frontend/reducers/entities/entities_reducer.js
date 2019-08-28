import {combineReducers} from "redux";
import usersReducer from "./users_reducer";
import tracksReducer from "./tracks_reducer";
import tracklist from "./tracklist_reducer"
import currentTrack from "./current_track_reducer"
import playlists from "./playlist_reducer";
import playlistTracks from "./playlist_tracks_reducer";

const entities = combineReducers({
    users:  usersReducer,
    tracks: tracksReducer,
    tracklist,
    currentTrack,
    playlists,
    playlistTracks
});

export default entities;