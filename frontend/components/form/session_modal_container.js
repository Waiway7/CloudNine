import {connect} from 'react-redux';
import SessionModal from './session_modal';
import {closeModal, openModal} from '../../actions/modal_actions';

const msp = state => {
    return{
    modal: state.ui.modal,
    session: state.session.id
}};

const mdp = dispatch => ({
    closeModal: () => dispatch(closeModal()),
    switchModal: (mode) => dispatch(openModal(mode))
});

export default connect(msp, mdp)(SessionModal)