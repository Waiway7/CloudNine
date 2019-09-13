import React from 'react';
import {connect} from "react-redux";
import {receiveLibrary, receivePlay, receivePause, receiveCurrentAudio} from "../../actions/user_actions";

class Music extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tracks: []
        }
        this.togglePlay = this.togglePlay.bind(this);
        this.togglePause = this.togglePause.bind(this);
        this.toggleForward = this.toggleForward.bind(this);
        this.toggleBackward = this.toggleBackward.bind(this);
    }


    togglePlay() {
        if (this.props.track.src) {
        this.setState({ 
          duration: this.props.track.duration,
          currentTime: this.props.track.currentTime
        })
        this.props.receivePlay()
        this.props.track.play()}
    }

    togglePause() {
        this.props.receivePause()
        this.props.track.pause()
    }

    toggleForward() {
        const tracks = this.props.library[Object.keys(this.props.library)[0]]
        const tracksIdx = Object.keys(tracks);
        const idx = tracksIdx.indexOf(this.props.info.id.toString()) + 1
        if (Object.keys(tracks).length > 1 && idx < tracksIdx.length){
            const track = tracks[tracksIdx[idx]]
            this.props.receiveCurrentTrack(new Audio(track.audioUrl), track)
        }
        this.props.receivePlay();
        this.props.track.play();
    }

    toggleBackward() {
        const tracks = this.props.library[Object.keys(this.props.library)[0]]
        const tracksIdx = Object.keys(tracks);
        let idx = tracksIdx.indexOf(this.props.info.id.toString()) - 1
        debugger
        if (this.state.currentTime <= 5 && idx >= 0){
            const audio = tracks[tracksIdx[idx]]
            this.props.receiveCurrentTrack(new Audio(audio.audioUrl), audio)
        } else {
            this.props.track.currentTime = 0
        }
        this.props.receivePlay();
        this.props.track.play();
    }

    componentDidUpdate(prevProps){
        if (prevProps.info.id !== this.props.info.id || 
            (prevProps.info.id === this.props.info.id && 
            Object.keys(prevProps.library)[0] !== Object.keys(this.props.library)[0])){
            if (prevProps.track.src){
                prevProps.track.pause();
            }
            this.props.track.play()
            this.props.receivePlay()
            this.props.track.addEventListener("timeupdate", e => {
                this.setState({
                    currentTime: e.target.currentTime,
                    duration: e.target.duration,
                    fakeDura: e.target.duration
            }, () => {
                if (this.state.currentTime !== undefined && this.state.currentTime === this.state.duration) {
                    if (Object.keys(this.props.library)[0] !== "index"){
                        const playlist = this.props.playlists[Object.keys(this.props.library)[0]].track_ids
                        const idx = playlist.indexOf(this.props.info.id + 1)
                        if (playlist[idx]) {
                            const track = this.props.library[Object.keys(this.props.library)[0]][playlist[idx]]
                            this.props.receiveCurrentTrack(new Audio(track.audioUrl), track);
                        } 
                        else {
                            this.props.receivePause();
                        }
                    } 
                    else {
                        this.props.receivePause();
                    }
                    
                }
            })})} 
    }

    getTime(time){
        if (!isNaN(time)) 
            {return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)}
    }

    render() {
        let currentTime = "0:00";
        let duration = "0:00";
        if (this.getTime(this.state.currentTime)){
            currentTime = this.getTime(this.state.currentTime)}
        if (this.getTime(this.state.duration)) {
            duration = this.getTime(this.state.duration)
        }
        let play;

        if (this.props.play != true || currentTime === duration) { 
          play = 

              <button className="status-btn" onClick={this.togglePlay}>
                  <i className="fas fa-play test-status"></i>
              </button>

        }  
        else ( 
          play = 
              <button className="status-btn" onClick={this.togglePause}>
                  <i className="fas fa-pause test-status"></i>
              </button>
        )
        let content;
        if (this.props.track.src){
            content =
                <div className="info-container">
                    <img className="preview-music" src={this.props.info.imageUrl} />
                    <div className="title-uploader">
                        <p className="music-uploader">Cloudnine</p>
                        <p className="music-track-title">{this.props.info.title}</p>
                    </div>
                </div>
        }
        let musicPlayer = (<div></div>);
       if (this.props.play != null) {
        musicPlayer =  (
        <footer>
        <div className="player-container">
            <div className="button-container">
                <i className="fas fa-step-backward" onClick={this.toggleBackward}></i>
                {play}
                <i className="fas fa-step-forward" onClick={this.toggleForward}></i>
            </div>
            <div className="progress-bar-container">
                <div className="current-time">{currentTime}</div>
                <div className="progress-bar"></div>
                <div className="track-time">{duration}</div>
                <div className="volume"><i className="fas fa-volume-up"></i></div>
            </div>
           {content}
        </div>
        </footer>
      ) }
      return musicPlayer
    }
}

const msp = (state) => {
    const track = state.entities.currentTrack.audio || {};
    const info = state.entities.currentTrack.info || {};
    return {
        library: state.entities.tracklist,
        playlists: state.entities.playlists,
        play: state.ui.player,
        user: state.session,
        track,
        info
    }
}

const mdp = (dispatch) => {
    return {
        receivePlay: () => dispatch(receivePlay()),
        receivePause: () => dispatch(receivePause()),
        receiveCurrentTrack: (track, info) => dispatch(receiveCurrentAudio(track, info))
        // receiveLibrary: (track) => dispatch(receiveLibrary(track))
    }
}

export default connect(msp, mdp)(Music);


 // componentDidMount(){
    //     if (this.props.track.id){
    //     this.state.player.addEventListener("timeupdate", e => {
    //         this.setState({
    //             currentTime: e.target.currentTime,
    //             duration: e.target.duration
    //     })})}
    // }

    // componentWillUnmount() {
    //     if (this.props.track.audioUrl){
    //     this.player.removeEventListener("timeupdate", () => {})};
    // }

 // if (this.state.currentTime !== undefined && this.state.currentTime === this.state.duration) {
        //     if (Object.keys(this.props.library)[0] !== "index"){
        //         const playlist = this.props.playlists[Object.keys(this.props.library)[0]].track_ids
        //         const idx = playlist.indexOf(this.props.info.id + 1)
        //         if (playlist[idx]) {
        //             const track = this.props.library[Object.keys(this.props.library)[0]][playlist[idx]]
        //             this.props.receiveCurrentTrack(new Audio(track.audioUrl), track);
        //         } 
        //         else {
        //             this.props.receivePause();
        //         }
        //     } 
        //     else {
        //         this.props.receivePause();
        //     }
            
        // }