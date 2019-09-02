import {OPEN_PLAYLIST_MODAL, CLOSE_MODAL} from "../../actions/modal_actions";

const playlistModalReducer = (state = null, action) => {
    Object.freeze(state)
    switch (action.type) {
        case OPEN_PLAYLIST_MODAL:
            return [action.id, action.playlistType]
        case CLOSE_MODAL:
            return null;
        default: 
            return state;
    }
}

export default playlistModalReducer;