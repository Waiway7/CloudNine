import React from 'react';
import {connect} from "react-redux"
import {receiveLibrary, receivePlay, receivePause, receiveCurrentAudio} from "../../actions/user_actions"
import PlaylistTracks from "./profile_playlist_tracks";
import {openPlaylistModal} from "../../actions/modal_actions"


class PlaylistItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hover: false,
        }
        this.handlePlay = this.handlePlay.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    onHover(){
        this.setState({hover: true})
    }

    offHover(){
        this.setState({hover: false})
    }

    handlePlay(e){
        const value = e.currentTarget.id;
        const library = {[value]: this.props.playlistTracks[value]};   
        if (Object.keys(this.props.trackList)[0] !== Object.keys(library)[0]){    
            this.props.receivePlay();
            this.props.receiveLibrary(library);
            const track = library[value][Object.keys(library[value])[0]];
            const audio = new Audio(track.audioUrl);
            this.props.receiveCurrentAudio(audio, track);
        } else if (this.props.play === true){
            this.props.receivePause();
            this.props.audio.pause();
        } else {
            this.props.receivePlay();
            this.props.audio.play();
        }
    }

    handleDelete(){
        this.props.openDeleteModal(this.props.playlist.id, "deletePlaylist")
    }

    render() {
        // const {id} = this.props.currentTrackInfo;
        const {play} = this.props
        let status;
        let imgPlaylist;
        let tracksFromPlaylist;
        let soundWave;
        let tracksPlaylistList;
        if (Object.keys(this.props.trackList)[0] === this.props.playlist.id.toString() && play === true){
            status = <i id={this.props.playlist.id} 
                        className="fas fa-pause-circle fa-3x index-play"  
                        onClick={this.handlePlay}>
                    </i>
        }
        else {
            status = <i id={this.props.playlist.id} 
                        className="fas fa-play-circle fa-3x playlist-dashboard-play" 
                        onClick={this.handlePlay}>
                    </i>
        }
        
        if (this.props.playlist.imageUrl !== undefined) {
            imgPlaylist = <img className="playlist-index-img" src={this.props.playlist.imageUrl}/>
        } else if (this.props.tracks){
            imgPlaylist = <img className="playlist-index-img" src={this.props.tracks[this.props.playlist.track_ids[0]].imageUrl}/>
        } else {
            imgPlaylist = <div className="playlist-index-img"></div>
        }

        if (this.props.playlist.track_ids.length === 0) {
            status = <i id={this.props.playlist.id} 
                        className="fas fa-play-circle fa-3x playlist-dashboard-play no-tracks">
                    </i>
            soundWave = <div className="soundwave-no-tracks">This playlist has no tracks yet</div>
            tracksPlaylistList = <div className="no-tracks-border-bar"></div>
        }
        else {
            soundWave = <div className="soundwave-no-tracks">In Progress</div>
            tracksPlaylistList = <PlaylistTracks 
                                    tracks={this.props.playlistTracks[this.props.playlist.id]}
                                    playlist={this.props.playlist}
                                 />
        }

        return (
            <div className="playlist-index-dashboard-container">
                {imgPlaylist}
                <div className="container-playlist-track-info-index">
                    <div className="playlist-track-index-dash-container">
                        <div className="play-btn-playlist-dashboard">
                            {status}
                        </div>
                        <div className="text-content-playlist-index">
                            <div className="username-playlist-dashboard">CloudNine</div>
                            <div className="playlist-title-dashboard">{this.props.playlist.title}</div>
                        </div>
                    </div>
                    {tracksFromPlaylist}
                    <div className="container-sound-wave-playlist">
                        {soundWave}
                    </div>
                    {tracksPlaylistList}
                    <div className="btns-playlist-items-options">
                        <div className="playlist-container-btn">
                            <div className="center-btns">
                                <i className="fas fa-pencil-alt playlist-edit-btn"></i>
                                <div className="text-container-edit-playlist-btn">Edit</div>
                            </div>
                        </div>
                        <div className="playlist-container-btn">
                            <div className="center-btns" onClick={this.handleDelete}>
                                <i className="fas fa-trash playlist-trash"></i>
                                <div className="text-container-trash-playlist-btn">Delete Playlist</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}


const msp = (state, ownProps) => {
    const currentTrackInfo = state.entities.currentTrack.info || {};
    return {
        play: state.ui.player,
        audio: state.entities.currentTrack.audio,
        currentTrackInfo,
        playlists: state.entities.playlists,
        playlistTracks: state.entities.playlistTracks,
        trackList: state.entities.tracklist
    }
}

const mdp = (dispatch) => {
    return {
        receiveLibrary: (library) => dispatch(receiveLibrary(library)),
        receivePause: () => dispatch(receivePause()),
        receivePlay: () => dispatch(receivePlay()),
        receiveCurrentAudio: (audio, info) => dispatch(receiveCurrentAudio(audio, info)),
        receiveLibrary: (library) => dispatch(receiveLibrary(library)),
        openDeleteModal: (id, playlistType) => dispatch(openPlaylistModal(id, playlistType)),
    }
}

export default connect(msp, mdp)(PlaylistItem);