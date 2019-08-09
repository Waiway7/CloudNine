import React from 'react';
import UploadModal from "./modal_update"
import Music from "./play_test";
import {connect} from "react-redux"
import {receiveLibrary, receivePlay, receivePause} from "../../actions/user_actions"

// const TrackItem = ({track, modal, updateTrack, deleteTrack, openUploadModal, closeUploadModal}) => {

//     // const trackImage = new Image(100, 200);
//     // trackImage.src = 'track.jpg'
//     // const audio = new Audio(track.audioUrl)
//     // const duration = parseInt(audio.duration)
//     // debugger
//     return (
//         <li className={`audio${track.id}`}>
//             <img key={`img-${track.id}`} className="preview" src={track.imageUrl} />
//             <button className={`delete-btn${track.id}`} onClick={() => deleteTrack(track.id)}>delete</button>
//             <button className={`update-btn${track.id}`} onClick={() => openUploadModal(track.id)}>modal</button> 
//             {/* will dispatch a player action add the track to the state and play as well */}
//             <Music track={track}/>
//             <p>{duration}</p>
//         </li>
//     )
// } 


class TrackItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hover: false,
            play: null
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

    handlePlay(e){
        const value = e.currentTarget.id;
        this.props.receivePause();
        this.props.receiveLibrary(this.props.trackList[value]);
        // this.props.receivePlay();
        if (value === this.state.play) {
            this.setState({play: null})
        } else {this.setState({play: `play-${this.props.track.id}`})}
    }

    render() {
        let date;
        const {track} = this.props;
        const hover = this.state.hover ? "hover-track" : "track-item-container";
        const bottomBorder = this.state.hover ? "play-track-item" : "track-item-container";
        const hoverPlay = this.state.hover ? "fas fa-play-circle fa-2x" : "";
        const hoverCircle = this.state.hover ? "fas fa-circle fa-2x" : "";
        const hoverTrash = this.state.hover ? "hover-i-button" : "empty-btn";
        const pauseCircle = this.state.play != track.id && this.state.play ? "fas fa-play-circle fa-2x" : "";
        // const puasePlayer = this.sta

        if (this.props.track.created_at){
             date = new Date(track.created_at)}
        return (
            <li key={`audio${track.id}`} className={"track-item"}>
                <div className={`${bottomBorder} ${hover}`} onMouseOver={this.onHover.bind(this)} onMouseOut={this.offHover.bind(this)}>
                   
                    <img key={`img-${track.id}`} className="preview" src={track.imageUrl} />
                    <i className={hoverCircle} ></i> 
                    <i className={hoverPlay} id={track.id} onClick={this.handlePlay.bind(this)}></i>                
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
    return {
        trackList: state.entities.tracks,
        song: state.entities.tracklist,
        play: state.ui.player
    }
}

const mdp = (dispatch) => {
    return {
        receiveLibrary: (track) => dispatch(receiveLibrary(track)),
        receivePause: () => dispatch(receivePause()),
        receivePlay: () => dispatch(receivePlay())
    }
}

export default connect(msp, mdp)(TrackItem);




