import React from 'react';
import {connect} from "react-redux"
import {receiveLibrary, receivePlay, receivePause, receiveCurrentAudio} from "../../actions/user_actions"


class TrackItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hover: false,
        }
        this.audio = new Audio(this.props.track.audioUrl)
    }

    componentDidMount(){
        this.audio.addEventListener('loadedmetadata', () => 
        this.setState({duration: this.audio.duration}))
    }

    getTime(time){
        return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    }

    onHover(){
        this.setState({hover: true})
    }

    offHover(){
        this.setState({hover: false})
    }

    // handleClick(e){
    // }

    handlePlay(e){
        const value = e.currentTarget.id;
        const audio = this.props.trackList[value];
        // this.props.receivePause();debugge
        if (this.props.currentTrackInfo.id === Number(value) && !this.props.play) {
            this.props.receivePlay();
            this.props.audio.play();
        } else  if (this.props.play && this.props.currentTrackInfo.id === Number(value)){
            this.props.receivePause();
            this.props.audio.pause();
        }
        else {
            if (this.props.play){ 
                this.props.receivePause();
                this.props.audio.pause();
            }
            this.props.receivePlay();
            this.props.receiveLibrary({"index": this.props.trackList});
            this.props.receiveCurrentAudio(new Audio(audio.audioUrl), audio);
    }
    }

    render() {
        const {track} = this.props; 
        const {id} = this.props.currentTrackInfo;
        const {play} = this.props
        let hoverPlay;
        let modalPlaylistType = "add"
        
        if (id === track.id && play) {
            hoverPlay = "fas fa-pause-circle fa-3x index-play" 
        }
        else if (!this.state.hover) {
            hoverPlay = "fas fa-play-circle fa-3x index-play"
        }
        else if (this.state.hover && id != track.id || !play) {
            hoverPlay =  "fas fa-play-circle fa-3x index-play"
        }

        if (Object.keys(this.props.playlists).length === 0) {
            modalPlaylistType = "create"
        }

        return (
            <li key={`audio${track.id}`} className="index-track-item">
                <div className="index-track-item-container">
                    <img key={`img-${track.id}`} className="index-preview" src={track.imageUrl} />
                    <div className="container-track-info-index">
                        <div className="index-btn-container">
                            <i className={hoverPlay} id={track.id} onClick={this.handlePlay.bind(this)}></i>
                        </div>
                        <div className="index-track-item-info">
                            <span className="index-username">{this.props.uploader}</span>
                            <span className="index-title">{track.title}</span>
                    </div>
                    <div className="index-buttons-up-del">
                        <div
                            className="delete-track-index"
                            onClick={() => this.props.deleteTrack(track.id)}>
                                <i className="fas fa-trash audio-trash"></i><p className="delete-text">Delete</p>
                        </div>
                        <div
                            className="update-track-index"
                            onClick={() => this.props.openUploadModal(track.id)}>
                                <i className="fas fa-pencil-alt audio-trash"></i><p className="edit-text">Edit</p>
                        </div>
                        <div 
                            className="edit-track-index"
                            onClick={() => {
                                this.props.playlistModal(track.id, modalPlaylistType)}
                                }>
                                <i className="fas fa-plus audio-trash"></i><p className="edit-text">Add to Playlist</p>
                        </div>
                </div>
                </div>
                    
                    {/* <div className="duration-length">{this.getTime(this.state.duration)}</div> */}
        
                    {/* will dispatch a player action add the track to the state and play as well */}
                </div>
            </li>
        )
    }
}


const msp = (state) => {
    const currentTrackInfo = state.entities.currentTrack.info || {}
    return {
        trackList: state.entities.tracks,
        play: state.ui.player,
        audio: state.entities.currentTrack.audio,
        currentTrackInfo,
        playlists: state.entities.playlists,
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

export default connect(msp, mdp)(TrackItem);