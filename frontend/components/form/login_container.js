import {connect} from "react-redux";
import Form from "./form"
import {login} from "../../actions/session_actions"

const msp = (state) => {
    return {
        errors: state.errors,
        formType: 'Login'
    }
}

const mdp = dispatch => {
    return {
        userForm: (user) => dispatch(login(user)),
    };
};

export default connect(msp, mdp)(Form)