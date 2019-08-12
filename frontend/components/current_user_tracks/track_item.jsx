import React from 'react';
import UploadModal from "./modal_update"
import Music from "./play_test";
import {connect} from "react-redux"
import {receiveLibrary, receivePlay, receivePause, receiveCurrentAudio} from "../../actions/user_actions"

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
        // this.props.receivePause();
        if (this.state.value === value && !this.props.play) {
            this.props.receivePlay();
            this.props.audio.play();
        }
        else {
            if (this.props.play){ this.props.audio.pause();}
        this.props.receivePlay();
        this.props.receiveLibrary(this.props.trackList);
        this.props.receiveCurrentAudio(new Audio(this.props.trackList[value].audioUrl));
        this.setState({value})
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
        let hover = this.state.hover ? "hover-track" : "track-item-container";
        let bottomBorder = this.state.hover ? "play-track-item" : "track-item-container";
        let hoverPlay = this.state.hover ? "fas fa-play-circle fa-2x" : "";
        let hoverCircle = this.state.hover ? "fas fa-circle fa-2x" : "";
        let hoverTrash = this.state.hover ? "hover-i-button" : "empty-btn";
        // const puasePlayer = this.sta
        
        // if (this.state.hover === true || Number(this.state.value) === track.id) {
        //     hover = "hover-track";
        //     bottomBorder = "play-track-item";
        // } else {
        //     hover = "track-item-container"
        //     bottomBorder = "track-item-container"
        // }
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
        play: state.ui.player,
        audio: state.entities.currentTrack

        // currentTrack: state.entities.player
    }
}

const mdp = (dispatch) => {
    return {
        receiveLibrary: (library) => dispatch(receiveLibrary(library)),
        receivePause: () => dispatch(receivePause()),
        receivePlay: () => dispatch(receivePlay()),
        receiveCurrentAudio: (audio) => dispatch(receiveCurrentAudio(audio)) 
    }
}

export default connect(msp, mdp)(TrackItem);




