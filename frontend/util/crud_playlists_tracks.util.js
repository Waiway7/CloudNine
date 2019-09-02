export const addPlaylistTrack = (playlist_id, track_id) => {
    return $.ajax({
        method: "POST",
        url: "/api/playlist_tracks",
        data: {playlist_id, track_id}
    })
}

export const deletePlaylistTrack = (id) => {
    return $.ajax({
        method: "DELETE",
        url: `/api/playlist_tracks/${id}`
    })
}

export const fetchPlaylistTracks = (id) => {
    return $.ajax({
        method: "GET",
        url: `/api/playlist_tracks/${id}`
    })
}

export const fetchPlaylistsTracks = () => {
    return $.ajax({
        method: "GET",
        url: `/api/playlist_tracks/`
    })
}

