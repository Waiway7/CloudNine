import {combineReducers} from 'redux';
import modalReducer from './modal_reducer';
import uploadModalReducer from './upload_modal_reducer'

export default combineReducers({
    modal: modalReducer,
    uploadModal: uploadModalReducer,
})