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
        this.player = new Audio()
    }


    togglePlay() {
        this.setState({ 
          duration: this.player.duration,
          currentTime: this.player.currentTime
        })
        this.props.receivePlay()
        this.player.play()
    }

    togglePause() {

        this.props.receivePause()
        this.player.pause()

    }

    componentDidUpdate(prevProps){
        if (prevProps.track.id != this.props.track.id){
            if (this.player.src){
                this.player.pause()
            }
            this.player.src = this.props.track.audioUrl;
            this.player.play();
            this.props.receivePlay();
            this.player.addEventListener("timeupdate", e => {
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

    componentWillUnmount() {
        if (this.props.track.audioUrl){
        this.player.removeEventListener("timeupdate", () => {})};
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

            <button className="status-btn" key={`play-${this.props.track.id}`} onClick={this.togglePlay}>
                <i className="fas fa-play"></i>
            </button>

      }  
      else ( 
        play = 
            <button className="status-btn" key={`play-${this.props.track.id}`} onClick={this.togglePause}>
                <i className="fas fa-pause"></i>
            </button>
      )

      return (
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
        </div>
      );
    }
}

const msp = (state) => {
    return {
        trackList: state.entities.tracks,
        track: state.entities.tracklist,
        play: state.ui.player
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