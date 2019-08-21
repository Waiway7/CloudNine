import {connect} from "react-redux";
import Form from "./form"
import {login, resetErrors} from "../../actions/session_actions"

const msp = (state) => {
    const errors = state.errors || []
    return {
        errors,
        formType: 'Login'
    }
}

const mdp = dispatch => {
    return {
        userForm: (user) => dispatch(login(user)),
        resetErrors: () => dispatch(resetErrors())

    };
};

export default connect(msp, mdp)(Form)