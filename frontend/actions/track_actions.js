import * as TrackApiUtil from '../util/crud_tracks.util';

export const RECEIVE_TRACK = 'RECEIVE_TRACK';
export const REMOVE_TRACK = 'REMOVE_TRACK';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';
export const RECEIVE_USER_LIBRARY = 'RECEIVE_USER_LIBRARY';


const receiveTrack = (track) => ({
    type: RECEIVE_TRACK,
    track
})

const removeTrack = (trackId) =>({
    type: REMOVE_TRACK,
    trackId
})

export const receiveErrors = errors => ({
    type: RECEIVE_ERRORS,
    errors
})

const receiveUserLibrary = (tracks) => ({
    type: RECEIVE_USER_LIBRARY,
    tracks
})

export const fetchTrack = (id) => {
    return dispatch => {
        return TrackApiUtil.fetchTrack(id)
            .then( track => dispatch(receiveTrack(track)), error => {
                return dispatch(receiveErrors(error.responseJSON))
            })
    }
}

export const deleteTrack = (id) => {
    return dispatch => {
        return TrackApiUtil.deleteTrack(id)
            .then( track => dispatch(removeTrack(track)))
    }
}

export const updateTrack = (track) => {
    return dispatch => {
        return TrackApiUtil.updateTrack(track.id)
            .then( track => dispatch(receiveTrack(track)), error => {
                return dispatch(receiveErrors(error.responseJSON))
            })
    }
}

export const createTrack = (track) => {
    return dispatch => {
        return TrackApiUtil.createTrack(track)
            .then( track => dispatch(receiveTrack(track)), error => {
                return dispatch(receiveErrors(error.responseJSON))
            })
    }
}

export const fetchUserTracks = (user) => {
    return dispatch => {
        return TrackApiUtil.fetchUserTracks(user.id)
            .then( tracks => {return dispatch(receiveUserLibrary(tracks))}
                , error => {
                return dispatch(receiveErrors(error.responseJSON))
            })
    }
}

