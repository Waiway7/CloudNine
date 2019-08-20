import React from 'react';
import {connect} from "react-redux";
import {receiveLibrary, receivePlay, receivePause} from "../../actions/user_actions";

class Music extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        }
        this.togglePlay = this.togglePlay.bind(this);
        this.togglePause = this.togglePause.bind(this);
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

    componentDidUpdate(prevProps){
        if (prevProps.track.src != this.props.track.src){
            // if (this.props.track.src){
            //     this.props.track.pause()
            // }
            // this.player.src = this.props.track.audioUrl;
            // this.player.play();
            // this.props.receivePlay();
            this.props.track.play()
            this.props.track.addEventListener("timeupdate", e => {
                this.setState({
                    currentTime: e.target.currentTime,
                    duration: e.target.duration
            })})}
      
        
    }

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
                  <i className="fas fa-play"></i>
              </button>

        }  
        else ( 
          play = 
              <button className="status-btn" onClick={this.togglePause}>
                  <i className="fas fa-pause"></i>
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
                <i className="fas fa-step-backward"></i>
                {play}
                <i className="fas fa-step-forward"></i>
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
        trackList: state.entities.tracks,
        library: state.entities.tracklist,
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
        // receiveLibrary: (track) => dispatch(receiveLibrary(track))
    }
}

export default connect(msp, mdp)(Music)