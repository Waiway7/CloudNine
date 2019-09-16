export const addPlaylistTrack = (playlist_id, track_id) => {
    return $.ajax({
        method: "POST",
        url: "/api/playlist_tracks",
        data: {playlist_id, track_id}
    })
}

export const deletePlaylistTrack = (trackId, playlistId) => {
    return $.ajax({
        method: "DELETE",
        url: `/api/playlist_tracks/`,
        data: {trackId, playlistId}
    })
}

export const fetchPlaylistTracks = (id, userId) => {
    return $.ajax({
        method: "GET",
        url: `/api/users/${userId}/playlist_tracks/${id}`
    })
}

export const fetchPlaylistsTracks = (userId) => {
    return $.ajax({
        method: "GET",
        url: `/api/users/${userId}/playlist_tracks/`
    })
}

