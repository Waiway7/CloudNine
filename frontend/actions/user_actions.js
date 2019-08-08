//User's allowed actions
// ui/player : library 

export const RECEIVE_PLAY = 'RECEIVE_PLAY';
export const RECEIVE_PAUSE = 'RECEIVE_PAUSE';
export const RECEIVE_LIBRARY = 'RECEIVE_LIBRARY';

export const RECEIVE_PLAY = (track) => {
    return {
    type: RECEIVE_PLAY,
    track
}}

export const RECEIVE_LIBRARY = (library) => {
    return {
        type: RECEIVE_LIBRARY,
        library
    }
}
