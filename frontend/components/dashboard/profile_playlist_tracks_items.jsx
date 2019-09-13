import React from "react"
import {connect} from "react-redux"
import {receiveLibrary, receivePlay, receivePause, receiveCurrentAudio} from "../../actions/user_actions"
import {openPlaylistModal} from "../../actions/modal_actions"

class PlaylistTracksItems extends React.Component {
    constructor(props){
        super(props)
        this.selectAudio = this.selectAudio.bind(this);
    }


    selectAudio(e){
        const id = e.currentTarget.id;
        const playlistId = this.props.playlist.id
        const library = {[playlistId]: this.props.playlistTracks[playlistId]};   
        if (Object.keys(this.props.trackList)[0] !== Object.keys(library)[0]){ 
            this.props.receivePlay();
            this.props.receiveLibrary(library);
            const track = library[playlistId][id]; 
            const audio = new Audio(track.audioUrl);
            this.props.receiveCurrentAudio(audio, track);
        } 
        else if (this.props.play === true 
        && Number(Object.keys(this.props.trackList)[0]) === playlistId
        && Number(id) === this.props.currentTrackInfo.id){
            this.props.receivePause();
            this.props.audio.pause();
        } 
        else if (Number(id) !== this.props.currentTrackInfo.id) {
            this.props.audio.pause();
            this.props.receivePlay();
            const track = library[playlistId][id]; 
            const audio = new Audio(track.audioUrl);
            this.props.receiveCurrentAudio(audio, track);
            this.props.audio.play();
        } else {
            this.props.receivePlay();
            this.props.audio.play();
        }
    }

    render() {
       
        let selectedTrack = ""
        const {playlist} = this.props
        const {track} = this.props
        const {idx} = this.props
        if (playlist.id === Number(Object.keys(this.props.trackList)[0])
            && this.props.currentTrackInfo.id === track.id
            && this.props.play === true) {
            selectedTrack = "selected-track-from-playlist";
        }
        return (
            <div id={track.id} className={`list-track-playlist-container ${selectedTrack}`} onClick={this.selectAudio}>
                <div className="center-list-track-playlist-container">
                    <div className="container-for-img-track-list">
                        <img className="img-track-playlist-index" src={track.imageUrl}/>
                    </div>
                    <div className={`text-list-track-playlist-container ${selectedTrack}`}>
                        <div className={`playlist-track-order ${selectedTrack}`}>{idx + 1}</div>
                        <div className={`title-track-playlist-list ${selectedTrack}`}>{track.title}</div>
                        <div className={`dash-sep ${selectedTrack}`}>-</div>
                        <div className={`creater-track-playlist-list ${selectedTrack}`}>cloudnine</div>
                    </div>
                </div>
            </div>
        )
    }
}

const msp = (state, ownProps) => {
    const currentTrackInfo = state.entities.currentTrack.info || {};
    const trackList = state.entities.tracklist || {};
    return {
        play: state.ui.player,
        audio: state.entities.currentTrack.audio,
        currentTrackInfo,
        playlists: state.entities.playlists,
        playlistTracks: state.entities.playlistTracks,
        trackList
    }
}

const mdp = (dispatch) => {
    return {
        receiveLibrary: (library) => dispatch(receiveLibrary(library)),
        receivePause: () => dispatch(receivePause()),
        receivePlay: () => dispatch(receivePlay()),
        receiveCurrentAudio: (audio, info) => dispatch(receiveCurrentAudio(audio, info)),
        openDeleteModal: (id, playlistType) => dispatch(openPlaylistModal(id, playlistType)),
    }
}

export default connect(msp, mdp)(PlaylistTracksItems);