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

export const updateTrack = (track, id) => {
    return $.ajax({
        method: "PATCH",
        url: `/api/tracks/${id}`,
        data: track,
        contentType: false,
        processData: false,
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

export const fetchUserTracks = (user) => {
    return $.ajax({
        method: "GET",
        url: `/api/users/${user.id}/tracks`
    })
}