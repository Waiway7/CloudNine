export const fetchPlaylist = (id) => {
    return $.ajax({
        method: "GET",
        url: `/api/playlists/${id}`
    })
}

export const deletePlaylist = (id) => {
    return $.ajax({
        method: "DELETE",
        url: `/api/playlists/${id}`
    })
}

export const updatePlaylist = (playlist, id) => {
    return $.ajax({
        method: "PATCH",
        url: `/api/playlists/${id}`,
        data: playlist,
        contentType: false,
        processData: false,
    })
}

export const createPlaylist = (playlist) => {
    return $.ajax({
        method: "POST",
        url: "/api/playlists",
        data: playlist,
        contentType: false,
        processData: false,
    })
}

export const fetchPlaylists = () => {
    return $.ajax({
        method: "GET",
        url: '/api/playlists'
    })
}
