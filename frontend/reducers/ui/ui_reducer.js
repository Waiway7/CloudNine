import {combineReducers} from 'redux';
import modalReducer from './modal_reducer';
import uploadModalReducer from './upload_modal_reducer'
import player from './player'

export default combineReducers({
    modal: modalReducer,
    uploadModal: uploadModalReducer,
    player
})