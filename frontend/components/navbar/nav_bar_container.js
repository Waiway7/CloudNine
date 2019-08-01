import {connect} from 'react-redux';
import NavBar from './nav_bar';
import { logout } from '../../actions/session_actions';
import {openModal} from '../../actions/modal_actions';
 


const mdp = dispatch => ({
    logout: () => dispatch(logout()),
    signup: () => dispatch(openModal('signup')),
    login: () => dispatch(openModal('login')),
})

export default connect(null, mdp)(NavBar);