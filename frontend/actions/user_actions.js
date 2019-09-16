import * as ApiUserUtil from '../util/users.util'

export const RECEIVE_PLAY = 'RECEIVE_PLAY';
export const RECEIVE_PAUSE = 'RECEIVE_PAUSE';
export const RECEIVE_LIBRARY = 'RECEIVE_LIBRARY';
export const RECEIVE_NEXT_TRACK = 'RECEIVE_NEXT_TRACK'
export const RECEIVE_CURRENT_AUDIO = "RECEIVE_CURRENT_AUDIO"
export const REMOVE_AUDIO ="REMOVE_AUDIO"

export const receivePlay = () => {
    return {
    type: RECEIVE_PLAY,
}}

export const receiveNextTrack = (track) => {
    return {
        type: RECEIVE_CLICK_TRACK,
        track
    }
}

export const receivePause = () => {
    return {
        type: RECEIVE_PAUSE
    }
}

export const receiveLibrary = (library) => {
    return {
        type: RECEIVE_LIBRARY,
        library
    }
}

export const receiveCurrentAudio = (track, trackInfo) => {
    return {
        type: RECEIVE_CURRENT_AUDIO,
        track,
        trackInfo
    }
}

export const removeCurrentAudio = () => {
    return {
        type: REMOVE_AUDIO
    }
}

export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
export const RECEIVE_USER = "RECEIVE_USER";

export const receiveAllUsers = (users) => {
    return {
        type: RECEIVE_ALL_USERS,
        users
    }
}

export const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        user
    }
}

export const fetchAllUsers = () => {
    return dispatch => {
        return ApiUserUtil.fetchAllUsers()
        .then( users => { 
                return dispatch(receiveAllUsers(users))
            }
        )
    }
}  

export const fetchUser = (id) => {
    return dispatch => {
        return ApiUserUtil.fetchUser(id)
        .then( user => { 
                return dispatch(receiveUser(user))
            }
        )
    }
}   
