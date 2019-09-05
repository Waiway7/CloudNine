import React from 'react';
import Banner from './banner'
import {receiveCurrentAudio, receivePlay, receivePause} from "../../actions/user_actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom"

class Splash extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            favAudio: ["https://cloudnine-upload-dev.s3.amazonaws.com/Tiffany+Young+-+Remember+Me+(from+Disneys+COCO).mp3",
                       "https://cloudnine-upload-dev.s3.amazonaws.com/Ludovico+Einaudi+-+Nuvole+Bianche.mp3",
                       "https://cloudnine-upload-dev.s3.amazonaws.com/%5BSTATION+X+0%5D+John+Legend+X+%EC%9B%AC%EB%94%94+(WENDY)+'Written+In+The+Stars'+MV.mp3",
                       "https://cloudnine-upload-dev.s3.amazonaws.com/John+Legend+-+All+of+Me+(Edited+Video).mp3",
                       "https://cloudnine-upload-dev.s3.amazonaws.com/Calum+Scott+-+No+Matter+What.mp3",
                       "https://cloudnine-upload-dev.s3.amazonaws.com/Eminem+-+Not+Afraid+(Official+Video).mp3",
                       "https://cloudnine-upload-dev.s3.amazonaws.com/Diddy+-+Dirty+Money+-+Coming+Home+ft.+Skylar+Grey+(Official+Video).mp3",
                       "https://cloudnine-upload-dev.s3.amazonaws.com/Akon+-+Lonely+(Offiical+Video).mp3",
                       "https://cloudnine-upload-dev.s3.amazonaws.com/Empire+State+Of+Mind+(Made+Famous+by+Jay-Z+feat.+Alicia+Keys).mp3",
                       "https://cloudnine-upload-dev.s3.amazonaws.com/Talking+to+the+Moon.mp3",
                       "https://cloudnine-upload-dev.s3.amazonaws.com/In+The+End+(Official+Video)+-+Linkin+Park.mp3",
                       "https://cloudnine-upload-dev.s3.amazonaws.com/Far+East+Movement%2C+Ryan+Tedder+-+Rocketeer+ft.+Ryan+Tedder.mp3"
                    ],
            audioInfo: [{id: 1, imageUrl: "https://cloudnine-upload-dev.s3.amazonaws.com/remember.jpg", title: "Remember Me", artist: "Tiffany Young"},
                        {id: 2, imageUrl: "https://cloudnine-upload-dev.s3.amazonaws.com/bianche.jpg", title: "Nuvole Bianche", artist: "Ludovico Einaudi"},
                        {id: 3, imageUrl: "https://cloudnine-upload-dev.s3.amazonaws.com/written.jpg", title: "Written In The Stars", artist: "John Legend X Wendy"},
                        {id: 4, imageUrl: "https://cloudnine-upload-dev.s3.amazonaws.com/all.jpg", title: "All of Me", artist: "John Legend"},
                        {id: 5, imageUrl: "https://cloudnine-upload-dev.s3.amazonaws.com/matter.jpg", title: "No Matter What", artist: "Calum Scott"},
                        {id: 6, imageUrl: "https://cloudnine-upload-dev.s3.amazonaws.com/afraid.png", title: "Not Afraid", artist: "Eminem"},
                        {id: 7, imageUrl: "https://cloudnine-upload-dev.s3.amazonaws.com/coming.jpg", title: "Coming Home", artist: "Dirty Money ft. Skylar Gray"},
                        {id: 8, imageUrl: "https://cloudnine-upload-dev.s3.amazonaws.com/lonely.jpg", title: "Lonely", artist: "Akon"},
                        {id: 9, imageUrl: "https://cloudnine-upload-dev.s3.amazonaws.com/empire.jpg", title: "Empire State Of Mind", artist: "Jay-Z feat. Alicia Keys"},
                        {id: 10, imageUrl: "https://cloudnine-upload-dev.s3.amazonaws.com/moon.jpg", title: "Talking to the Moon", artist: "Bruno Mars"},
                        {id: 11, imageUrl: "https://cloudnine-upload-dev.s3.amazonaws.com/end.jpg", title: "In the End", artist: "Linkin Park"},
                        {id: 12, imageUrl: "https://cloudnine-upload-dev.s3.amazonaws.com/rocketeer.jpg", title: "Rocketeer", artist: "Far East Movement ft. Ryan Tedder"}
                        ],
            hover: false,
        }
    }

    handlePlay(e) {
        const value = e.currentTarget.id;
        if (this.props.currentTrackInfo.id === (Number(value) + 1) && !this.props.play) {
            this.props.receivePlay();
            this.props.audio.play();
        } 
        else  if (this.props.play && this.props.currentTrackInfo.id === (Number(value) + 1)){
            this.props.receivePause();
            this.props.audio.pause();
        }
        else {
            if (this.props.play){ 
                this.props.receivePause();
                this.props.audio.pause();
            }
        this.props.receivePlay();
        // this.props.receiveLibrary(this.props.trackList);
        this.props.receiveCurrentAudio(new Audio(this.state.favAudio[value]), this.state.audioInfo[value]);
    }}

    onHover(e){
        const value = Number(e.currentTarget.id);
        this.setState({value: value, hover: true})
    }

    offHover(){
        this.setState({value: "", hover: false})
    }


    render() {
        
        const {id} = this.props.currentTrackInfo;
        const {play} = this.props
        const tracks = this.state.audioInfo.map( (trackInfo, idx) => {
            let hoverPlay;
            let hoverCircle
            if (id === trackInfo.id && play) {
                hoverPlay = "fas fa-pause-circle fa-4x" 
            }
            else if (!this.state.hover) {
                hoverPlay = ""
            }
            else if (this.state.hover && this.state.value === idx || !play && this.state.value === idx) {
                hoverPlay =  "fas fa-play-circle fa-4x"
            }
            hoverCircle = (this.state.hover && this.state.value === idx) || (id === trackInfo.id && play) ? "fas fa-circle fa-4x" : "";
            return (
                <li className="cover-container" key={`info-${idx}`}>
                    <img id={idx} src={trackInfo.imageUrl} className="cover"
                        onMouseOver={this.onHover.bind(this)} 
                        onMouseOut={this.offHover.bind(this)}/>
                    <i className={hoverCircle}></i> 
                    <i className={hoverPlay} id={idx} onClick={this.handlePlay.bind(this)}
                    onMouseOver={this.onHover.bind(this)} 
                    onMouseOut={this.offHover.bind(this)}></i>
                    <p className="top-title">{trackInfo.title}</p>
                    <p className="top-artist">{trackInfo.artist}</p>
                </li>
            )
        } )
       
        return (
            <div className="login-body">
                <div className="container-splash-front">
                    <Banner />
                    <ul className="editor-top">
                        {tracks}
                    </ul>
                    <div className="bottom-splash">
                        <Link to="/discover" style={{ textDecoration: 'none' }}><button className="trend-btn">Explore trending playlists</button></Link>
                    </div>
                </div>
                <div className="splash-footer">
                </div>
            </div>
            )
    }
}

const msp = (state) => {
    const currentTrackInfo = state.entities.currentTrack.info || {};
    return {
        audio: state.entities.currentTrack.audio,
        play: state.ui.player,
        currentTrackInfo
    }
} 

const mdp = (dispatch) => {
    return {
        receivePause: () => dispatch(receivePause()),
        receivePlay: () => dispatch(receivePlay()),
        receiveCurrentAudio: (audio, info) => dispatch(receiveCurrentAudio(audio, info))
    }
}

export default connect(msp, mdp)(Splash);