import {connect} from "react-redux";
import Form from "./form"
import {login} from "../../actions/session_actions"
import React from "react"

const msp = (state) => {
    return {
        errors: state.errors.session,
        formType: 'Login'
    }
}

const mdp = dispatch => {
    return {
        loginForm: (user) => dispatch(login(user))
    };
};

export default connect(msp, mdp)(Form)