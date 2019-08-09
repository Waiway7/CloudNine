import {combineReducers} from "redux";
import usersReducer from "./users_reducer";
import tracksReducer from "./tracks_reducer";
import tracklist from "./tracklist_reducer"

const entities = combineReducers({
    users:  usersReducer,
    tracks: tracksReducer,
    tracklist
});

export default entities;