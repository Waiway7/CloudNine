import * as PlaylistApiUtil from '../util/crud_playlists.util'

export const RECEIVE_PLAYLIST = "RECEIVE_PLAYLIST";
export const DELETE_PLAYLIST = "DELETE_PLAYLIST";
// export const UPDATE_PLAYLIST = "UPDATE_PLAYLIST";
// export const CREATE_PLAYLIST = "CREATE_PLAYLIST";
export const RECEIVE_PLAYLISTS = "RECEIVE_PLAYLISTS";
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const RECEIVE_USER_PLAYLIST = "RECEIVE_USER_PLAYLIST"


export const receiveErrors = errors => ({
    type: RECEIVE_ERRORS,
    errors
})

const receivePlaylist = (playlist) => ({
    type: RECEIVE_PLAYLIST,
    playlist
})

const removePlaylist = (playlistId) => ({
    type: DELETE_PLAYLIST,
    playlistId
})

const receivePlaylists = (playlists) => ({
    type: RECEIVE_PLAYLISTS,
    playlists
})

export const fetchPlaylist = (id) => {
    return dispatch => {
        return PlaylistApiUtil.fetchPlaylist(id)
            .then(playlist => dispatch(receivePlaylist(playlist)), error => {
                return dispatch(receiveErrors(error.responseJSON))
            })
    }
}

export const createPlaylist = (playlist) => {
    return dispatch => {
        return PlaylistApiUtil.createPlaylist(playlist)
            .then(playlist => dispatch(receivePlaylist(playlist)), error => {
                return dispatch(receiveErrors(error.responseJSON))
            })
    }
}

export const updatePlaylist = (playlist, id) => {
    return dispatch => {
        return PlaylistApiUtil.updatePlaylist(playlist, id)
            .then(playlist => dispatch(receivePlaylist(playlist)), error => {
                return dispatch(receiveErrors(error.responseJSON))
            })
    }
}

export const deletePlaylist = (id) => {
    return dispatch => {
        return PlaylistApiUtil.deletePlaylist(id)
            .then(playlist => dispatch(removePlaylist(playlist)), error => {
                return dispatch(receiveErrors(error.responseJSON))
            })
    }
}

export const fetchPlaylists = (userId) => {
    return dispatch => {
        return PlaylistApiUtil.fetchPlaylists(userId)
            .then(playlists => dispatch(receivePlaylists(playlists)), error => {
                return dispatch(receiveErrors(error.responseJSON))
            })
    }
}
