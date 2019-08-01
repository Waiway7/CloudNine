import {connect} from 'react-redux';
import Test from './test'
import { logout } from '../actions/session_actions';
import {openModal} from '../actions/modal_actions';
 
const msp = (state) => ({
    currentUser: state.session.id
});

const mdp = dispatch => ({
    logout: () => dispatch(logout()),
    signup: () => dispatch(openModal('signup')),
    login: () => dispatch(openModal('login')),
})

export default connect(msp, mdp)(Test);