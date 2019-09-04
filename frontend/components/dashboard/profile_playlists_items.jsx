import React from 'react';
import {connect} from "react-redux"
import {receiveLibrary, receivePlay, receivePause, receiveCurrentAudio} from "../../actions/user_actions"

class PlaylistItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hover: false,
        }
        // this.audio = new Audio(this.props.track.audioUrl)
    }

    onHover(){
        this.setState({hover: true})
    }

    offHover(){
        this.setState({hover: false})
    }

    render() {
        // const {id} = this.props.currentTrackInfo;
        const {play} = this.props
        let hoverPlay;
        let imgPlaylist;
        // if (id === track.id && play) {
        //     hoverPlay = "fas fa-pause-circle fa-3x index-play" 
        // }
        if (!this.state.hover) {
            hoverPlay = "fas fa-play-circle fa-3x playlist-dashboard-play"
        }
        else if (this.state.hover) {
            hoverPlay =  "fas fa-play-circle fa-3x playlist-dashboard-play"
        }

        if (this.props.playlist.imageUrl !== undefined) {
            imgPlaylist = <img className="playlist-index-img" src={this.props.playlist.imageUrl}/>
        } else if (this.props.tracks){
            imgPlaylist = <img className="playlist-index-img" src={this.props.tracks[this.props.playlist.track_ids[0]].imageUrl}/>
        } else {
            imgPlaylist = <div className="playlist-index-img"></div>
        }

        return (
            <div className="playlist-index-dashboard-container">
                {imgPlaylist}
                <div className="container-playlist-track-info-index">
                    <div className="play-btn-playlist-dashboard">
                        <i className={hoverPlay}></i>
                    </div>
                    <div className="text-content-playlist-index">
                        <div className="username-playlist-dashboard">CloudNine</div>
                        <div className="playlist-title-dashboard">{this.props.playlist.title}</div>
                    </div>
                </div>
            </div>
        )
    }
}


const msp = (state) => {
    const currentTrackInfo = state.entities.currentTrack.info || {}
    return {
        play: state.ui.player,
        audio: state.entities.currentTrack.audio,
        currentTrackInfo
    }
}

const mdp = (dispatch) => {
    return {
        receiveLibrary: (library) => dispatch(receiveLibrary(library)),
        receivePause: () => dispatch(receivePause()),
        receivePlay: () => dispatch(receivePlay()),
        receiveCurrentAudio: (audio, info) => dispatch(receiveCurrentAudio(audio, info)) 
    }
}

export default connect(msp, mdp)(PlaylistItem);