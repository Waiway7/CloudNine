import {combineReducers} from "redux";
import usersReducer from "./users_reducer";
import tracksReducer from "./tracks_reducer";

const entities = combineReducers({
    users:  usersReducer,
    tracks: tracksReducer,
});

export default entities;