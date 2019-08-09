//User's allowed actions
// ui/player : library 

export const RECEIVE_PLAY = 'RECEIVE_PLAY';
export const RECEIVE_PAUSE = 'RECEIVE_PAUSE';
export const RECEIVE_LIBRARY = 'RECEIVE_LIBRARY';
export const RECEIVE_NEXT_TRACK = 'RECEIVE_NEXT_TRACK'

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
