import * as UserApiUtil from "../util/session_utl"

export const RECEIVE_USER = 'RECEIVE_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS'

export const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
});

export const logoutUser = () => ({
    type: LOGOUT_USER,
});

export const receiveSessionErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

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