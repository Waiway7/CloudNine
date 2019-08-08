import React from 'react';

class Music extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          play: false,
          duration: null,
        };
        this.togglePlay = this.togglePlay.bind(this);
        this.togglePause = this.togglePause.bind(this);
    }


    togglePlay() {
        this.setState({ 
          play: true,
          duration: this.player.duration,
          currentTime: this.player.currentTime
        }, 
          () => {this.player.play()});
    }

    togglePause() {
        this.setState({
            play: false,
        }, () => {this.player.pause()})
    }

    componentDidMount(){
        this.player = new Audio(this.props.track.audioUrl);
        this.player.addEventListener("timeupdate", e => {
            this.setState({
                currentTime: e.target.currentTime,
                duration: e.target.duration
            })
        })
    }

    componentWillUnmount() {
        this.player.removeEventListener("timeupdate", () => {});
    }

    getTime(time){
        if (!isNaN(time)) {return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)}
    }

    render() {
      const currentTime = this.getTime(this.state.currentTime)
      const duration = this.getTime(this.state.duration)
      let play;

      if (this.state.play === false || currentTime === duration) { 
        play = 
            <button key={`play-${this.props.track.id}`} onClick={this.togglePlay}>
                Play
            </button>
      }  
      else ( 
        play = 
            <button key={`play-${this.props.track.id}`} onClick={this.togglePause}>
                Pause
            </button>
      )

      return (
        <div>
            {play}
            <div>{currentTime} / {duration}</div>
        </div>
      );
    }
}

export default Music;