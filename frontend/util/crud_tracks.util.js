export const fetchTrack = (id) => {
    return $.ajax({
        method: "GET",
        url: `/api/tracks/${id}`
    })
}

export const deleteTrack = (id) => {
    return $.ajax({
        method: "DELETE",
        url: `/api/tracks/${id}`
    })
}

export const updateTrack = (track) => {
    return $.ajax({
        method: "PATCH",
        url: `/api/tracks/${track.id}`,
        data: {track}
    })
}

export const createTrack = (track) => {
    return $.ajax({
        method: "POST",
        url: "/api/tracks",
        data: track,
        contentType: false,
        processData: false,
    })
}

export const fetchUserTracks = (uploader) => {
    debugger
    return $.ajax({
        method: "GET",
        url: `/api/users/${uploader.id}/tracks`
    })
}