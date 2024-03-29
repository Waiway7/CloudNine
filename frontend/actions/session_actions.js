import * as UserApiUtil from "../util/session_utl"
import { RECEIVE_ERRORS } from "./track_actions";

export const RECEIVE_USER = 'RECEIVE_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS'
export const RESET_ERRORS = "RESET_ERRORS"

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
});

const logoutUser = () => ({
    type: LOGOUT_USER,
});

const receiveSessionErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

export const resetErrors = () => ({
    type: RESET_ERRORS
})

export const login = (user) => {
    
    return dispatch => {
        return UserApiUtil.login(user)
            .then( user => dispatch(receiveUser(user)), error => { 
               return dispatch(receiveSessionErrors(error.responseJSON))}
            )}
}

export const signup = (user) => {
    return dispatch => {
        return UserApiUtil.signup(user)
            .then( user => dispatch(receiveUser(user)), error => {
                return dispatch(receiveSessionErrors(error.responseJSON))
            })
    }
}

export const logout = () => {
    return dispatch => {
        return UserApiUtil.logout()
            .then( () => dispatch(logoutUser()))
    }
}