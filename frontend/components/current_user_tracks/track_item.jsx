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
        // this.audio.addEventListener('loadedmetadata', () => 
        // this.setState({duration: this.audio.duration}))
    }

    componentDidMount(){
        this.audio.addEventListener('loadedmetadata', () => 
        this.setState({duration: this.audio.duration}))
    }

    // componentWillUnmount(){
    //     this.audio.removeEventListener('loadedmetadata', () => 
    //         this.setState({duration: this.audio.duration}))
    // }

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
            this.props.receiveLibrary(this.props.trackList);
            this.props.receiveCurrentAudio(new Audio(audio.audioUrl), audio);
    }
        // this.props.song.play()
        
        // this.props.receivePlay();
        // if (value === this.state.play) {
        //     this.setState({play: null})
        // } 
    }

    render() {
        let date;
        const {track} = this.props; 
        const {id} = this.props.currentTrackInfo;
        const {play} = this.props
        const hover = this.state.hover || (id === track.id && play)  ? "hover-track" : "track-item-container";
        const bottomBorder = this.state.hover || (id === track.id && play)? "play-track-item" : "track-item-container";
        let hoverPlay;
        const hoverCircle = this.state.hover || (id === track.id && play) ? "fas fa-circle fa-2x" : "";
        const hoverTrash = this.state.hover || (id === track.id && play)  ? "hover-i-button" : "empty-btn";
        
        if (id === track.id && play) {
            hoverPlay = "fas fa-pause-circle fa-2x" 
        }
        else if (!this.state.hover) {
            hoverPlay = ""
        }
        else if (this.state.hover && id != track.id || !play) {
            hoverPlay =  "fas fa-play-circle fa-2x"
        }

        return (
            <li key={`audio${track.id}`} className={"track-item"}>
                <div className={`${bottomBorder} ${hover}` } 
                    onMouseOver={this.onHover.bind(this)} 
                    onMouseOut={this.offHover.bind(this)}
                    >
                    <img key={`img-${track.id}`} className="preview" src={track.imageUrl} />
                    <div className="play-pause-container">
                        <i className={hoverCircle} ></i> 
                        <i className={hoverPlay} id={track.id} onClick={this.handlePlay.bind(this)}></i>
                    </div>
                    <div className="track-info">
                        <span className="user-name">{this.props.user.username}</span>
                        <span className="song-title">{track.title}</span>
                    </div>
                    <div className="buttons-up-del">
                        <button 
                            className={hoverTrash}
                            key={`delete-btn${track.id}`} 
                            onClick={() => this.props.deleteTrack(track.id)}>
                                <i className="fas fa-trash fa"></i>
                        </button>
                        <button 
                            key={`update-btn${track.id}`} 
                            className={hoverTrash}
                            onClick={() => this.props.openUploadModal(track.id)}>
                                <i className="fas fa-pencil-alt"></i>
                        </button>
                    </div>
                    <div className="right-track-info">
                        <div className="duration-length">{this.getTime(this.state.duration)}</div>
                    </div> 
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

export default connect(msp, mdp)(TrackItem);




