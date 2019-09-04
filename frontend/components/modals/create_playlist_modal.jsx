import React from 'react';
import {connect} from 'react-redux';
import {createPlaylist, fetchPlaylists} from "../../actions/playlist_actions";
import {addPlaylistTracks} from "../../actions/playlist_tracks_actions";
import PlaylistItemTracks from "./playlist_items_modal";
import AddItemTracks from './index_tracks_to_be_add';

class CreatePlaylistModal extends React.Component{
    constructor(props){
        super(props)
        const dupTracks = Object.assign({}, this.props.tracks)
        delete dupTracks[this.props.trackId]
        this.state = {
            title: "", 
            trackIds: {[this.props.trackId]: this.props.tracks[this.props.trackId]}, 
            current_id: this.props.currentUserId.id,
            tracks: dupTracks,
            uploaded: false,
            playlistId: null
        }
        this.handleDelete = this.handleDeleteTracksState.bind(this)
        this.addTracktoPlaylist = this.addTracktoPlaylist.bind(this)
    }

    handleDeleteTracksState(e){
        const value = e.currentTarget.id
        let removeTracks = Object.assign({}, this.state.trackIds)
        let addTracks = Object.assign({}, this.state.tracks, {[value]:this.state.trackIds[value]});
        delete removeTracks[value]
        this.setState({trackIds: removeTracks, tracks: addTracks})
    }

    addTracktoPlaylist(e){
        const value = e.currentTarget.id
        const updatedTracks = Object.assign({},this.state.trackIds, {[value]: this.props.tracks[value]})
        const dupTracks = Object.assign({}, this.state.tracks)
        delete dupTracks[value]
        this.setState({trackIds: updatedTracks, tracks: dupTracks})
    }
    
    update(field) {
        return (e) => this.setState({[field]: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault();
        if (this.state.title != "" && Object.keys(this.state.trackIds).length > 0){
            const playlist = {title: this.state.title, creater_id: this.state.current_id}
            this.props.createPlaylist(playlist).then((playlist) => {
                this.props.addPlaylistTracks(Object.keys(playlist.playlist)[0], Object.keys(this.state.trackIds))
                this.props.fetchPlaylists();
                this.setState({uploaded: true, playlistId: Object.keys(playlist.playlist)[0]})
                })
        }
    }

    render () {
        let uploadStatus;
        let addTracks;
        if (Object.keys(this.state.tracks).length > 0){
            addTracks = <div className="container-class-tracks-add">
                            <AddItemTracks 
                                addTracks={this.state.tracks}
                                addTracktoPlaylist={this.addTracktoPlaylist}
                            />
                        </div>
        }
        if (this.state.uploaded === false){
            uploadStatus = 
                <div className="">
                    <form className="create-playlist-submit" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="create-title-playlist">
                            <div className="title-playlist-format">Playlist title<p className="asterick-playlist">*</p></div>
                            <input type="text" 
                                value={this.state.title}  
                                onChange={this.update('title')}
                                className="input-title-playlist"
                            />
                        </div>
                        <div className="submit-playlist">
                            <input className="submit-create-playlist-btn" type="submit" value="Save"/>
                        </div>
                        <PlaylistItemTracks 
                        deleteTrack={this.handleDelete}
                        trackIds={this.state.trackIds}
                        tracks={this.props.tracks}
                    />
                    </form>
                    <div className="separator"></div>
                    {addTracks}
                </div>

        } else if (this.state.uploaded === true) {
            const playlistImg = this.props.tracks[Object.keys(this.state.trackIds)[0]].imageUrl;
            uploadStatus =  <div className="playlist-img-tracks-container">
                                <div className="playlist-info-tracks-container">
                                    <div className="container-for-playlist">
                                        <div className="box-one"></div>
                                        <div className="box-two"></div>
                                        <img className="playlist-img-track"src={`${playlistImg}`}></img>
                                    </div>
                                    <div className="info-create-playlist">
                                        <div className="creater-name">{this.props.currentUserId.username}</div>
                                    <div className="title-playlist-name">{this.props.playlists[this.state.playlistId].title}</div>
                                    </div>
                                </div>
                                <PlaylistItemTracks 
                                    // deleteTrack={this.handleDelete}
                                    trackIds={this.state.trackIds}
                                    tracks={this.props.tracks}
                                />                                
                            </div>    
        }
        return (
            <div>
                {uploadStatus}
            </div>
        )
    }
}

const msp = (state) => {
    return {
        currentUserId: state.session.id,
        tracks: state.entities.tracks,
        playlists: state.entities.playlists
}}

const mdp = (dispatch) => {
    return {
        fetchPlaylists: () => dispatch(fetchPlaylists()),
        createPlaylist: (playlist) => dispatch(createPlaylist(playlist)),
        addPlaylistTracks: (playlistId, trackIds) => dispatch(addPlaylistTracks(playlistId, trackIds))
    }
}

export default connect(msp, mdp)(CreatePlaylistModal);