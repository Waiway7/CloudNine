import * as PlaylistTrackApiUtil from "../util/crud_playlists_tracks.util"
export const DELETE_PLAYLIST_TRACK = "DELETE_PLAYLIST_TRACK";
export const RECEIVE_PLAYLISTS_TRACKS = "RECEIVE_PLAYLISTS_TRACKS";
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';


export const receivePlaylistTracks = (playlistsTracks) => ({
    type: RECEIVE_PLAYLISTS_TRACKS,
    playlistsTracks
})

const removePlaylistTrack = (playlistTrack) => ({
    type: DELETE_PLAYLIST_TRACK,
    playlistTrack
})  

export const receiveErrors = errors => ({
    type: RECEIVE_ERRORS,
    errors
})

export const fetchPlaylistsTracks = () => {
    return dispatch => {
        return PlaylistTrackApiUtil.fetchPlaylistsTracks()
            .then(playlistsTracks => dispatch(receivePlaylistTracks(playlistsTracks)), error => {
                return dispatch(receiveErrors(error.responseJSON))
            })
    }
}

export const fetchPlaylistTracks = (id) => {
    return dispatch => {
        return PlaylistTrackApiUtil.fetchPlaylistTracks(id)
            .then(playlistTracks => dispatch(receivePlaylistTracks(playlistTracks)), error => {
                return dispatch(receiveErrors(error.responseJSON))
            })
    }
}

export const addPlaylistTracks = (playlistId, trackIds) => {
    return dispatch => {
        return PlaylistTrackApiUtil.addPlaylistTrack(playlistId, trackIds)
            .then(tracks => dispatch(receivePlaylistTracks(tracks)), error => {
                return dispatch(receiveErrors(error.responseJSON))
            })
    }
}

export const deletePlaylistTrack = (trackId, playlistId) => {
    return dispatch => {
        return PlaylistTrackApiUtil.deletePlaylistTrack(trackId, playlistId)
            .then(playlist => dispatch(removePlaylistTrack(playlist)), error => {
                return dispatch(receiveErrors(error.responseJSON))
            })
    }
}