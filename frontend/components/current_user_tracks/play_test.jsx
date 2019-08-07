import React from 'react';

class Music extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          play: false,
          duration: null,
          currentTime: 0,
          progress: 0,
        };
        this.audio = new Audio(this.props.track.audioUrl);
        this.togglePlay = this.togglePlay.bind(this);
        this.togglePause = this.togglePause.bind(this);
        this.updateTime = this.updateTime.bind(this)
    }

    // handleStop() {
    //     this.audio.currentTime = 0;
    //     this.slider.value = 0;
    //     // this.audio.pause
    // }

    togglePlay() {
        this.setState({ 
          play: true,
          duration: this.audio.duration,
          currentTime: this.audio.currentTime
        }, 
          () => {this.audio.play()});
    }

    togglePause() {
        this.setState({
            play: false,
        }, () => {this.audio.pause()})
    }

    updateTime() {
        if (this.audio.currentTime === this.audio.duration) {
            this.audio.load()
        }
            setInterval(() => this.state.currentTime, 1000)
            this.setState({progress: `${this.audio.currentTime}`})
        
    }

    render() {
     
      let play;
      if (this.state.play === false) { play =
        <button key={`play-${this.props.track.id}`} onClick={this.togglePlay}>Play</button>
      }  else ( play =
        <button key={`play-${this.props.track.id}`} onClick={this.togglePause}>Pause</button>
      )
      return (
        <div>
            {play}
            <div>{this.state.progress}</div>
            <div>{this.state.duration}</div>
        </div>
      );
    }
}

export default Music;