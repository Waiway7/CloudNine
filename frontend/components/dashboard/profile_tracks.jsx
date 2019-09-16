import React from 'react';
import { connect } from 'react-redux';
import {fetchUserTracks, deleteTrack, updateTrack} from '../../actions/track_actions';
import {fetchPlaylists} from '../../actions/playlist_actions'
import {openUploadModal, closeUploadModal, closeModal, openPlaylistModal} from '../../actions/modal_actions';
import TrackItem from './profile_tracks_items'
import UpdateModal from '../current_user_tracks/modal_update'
import PlaylistModal from "../modals/playlist_modal";
import {fetchAllUsers} from "../../actions/user_actions";



class Tracks extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    componentDidMount(){
        this.props.fetchAllUsers();
        this.props.fetchUserTracks({"id":this.props.userId});
        this.props.fetchPlaylists(this.props.currentUser.id);
        window.scrollTo(0, 0)
    }

    render(){
        let tracks;
        let trackList;
        if (Object.keys(this.props.tracks).length > 0 && Object.keys(this.props.users).length > 0) {
            const users = this.props.users
            tracks = Object.keys(this.props.tracks).map(id => this.props.tracks[id])
            trackList = tracks.map(track => {
                const uploader = track.uploader_id
                return (
                <TrackItem 
                    uploader={users[uploader].username}
                    key={`track-id${track.id}`} 
                    track={track}
                    updateTrack={this.props.updateTrack}
                    deleteTrack={this.props.deleteTrack}
                    openUploadModal={this.props.openUploadModal}
                    closeUploadModal={this.props.closeUploadModal}
                    playlistModal={this.props.openPlaylistModal}
                    closeModal={this.props.closeModal}
                    modal={this.props.modal}
                    user={this.props.currentUser}
                />
            )})
        }

        let modalComponent;

        if (this.props.modal) {
            modalComponent = (
                <UpdateModal 
                    uploader={this.props.users}
                    track={this.props.tracks[this.props.modal]} 
                    updateTrack={this.props.updateTrack}
                    closeModal={this.props.closeUploadModal}
                />
            )
        } else if (this.props.playlistModal) {
            modalComponent = (
                <PlaylistModal
                    uploader={this.props.users}
                    trackId={this.props.playlistModal}
                    closeModal={this.props.closeModal} 
                    playlistModal={this.props.openPlaylistModal}
                    />
            )
        }


        return (
            <div className="track-index-container">
                <div className="container-tracks">
                    <ul className="index-list-tracks">{trackList}</ul>
                </div>
                {modalComponent}
            </div>
        )
    }
}

const msp = (state) => {
    return {
        currentUser: state.session.id,
        tracks: state.entities.tracks,
        modal: state.ui.uploadModal,
        playlistModal: state.ui.playlistModal,
        playlists: state.entities.playlists,
        users: state.entities.users
    }
}

const mdp = dispatch => {
    return {
        fetchPlaylists: (userId) => dispatch(fetchPlaylists(userId)),
        fetchUserTracks: user => dispatch(fetchUserTracks(user)),
        updateTrack: (track, id) => dispatch(updateTrack(track, id)),
        deleteTrack: id => dispatch(deleteTrack(id)),
        openUploadModal: (trackId) => dispatch(openUploadModal(trackId)),
        openPlaylistModal: (id, playlistType) => dispatch(openPlaylistModal(id, playlistType)),
        closeUploadModal: () => dispatch(closeUploadModal()),
        closeModal: () => dispatch(closeModal()),
        fetchAllUsers: () => dispatch(fetchAllUsers()),
    }
}

export default connect(msp, mdp)(Tracks);
