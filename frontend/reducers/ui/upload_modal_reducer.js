import {OPEN_UPLOAD_MODAL, CLOSE_UPLOAD_MODAL} from "../../actions/modal_actions";

const modalUploadReducer = (state = null, action) => {
    switch (action.type) {
        case OPEN_UPLOAD_MODAL:
            return action.uploadModal;
        case CLOSE_UPLOAD_MODAL:
            return null;
        default: 
            return state;
    }
}

export default modalUploadReducer;