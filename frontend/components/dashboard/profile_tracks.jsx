import React from 'react';
import { connect } from 'react-redux';
import {fetchUserTracks, deleteTrack, updateTrack} from '../../actions/track_actions';
import {fetchPlaylists} from '../../actions/playlist_actions'
import {openUploadModal, closeUploadModal, closeModal, openPlaylistModal} from '../../actions/modal_actions';
import TrackItem from './profile_tracks_items'
import UpdateModal from '../current_user_tracks/modal_update'
import PlaylistModal from "../modals/playlist_modal";

class Tracks extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchPlaylists()
        this.props.fetchUserTracks(this.props.currentUser)
    }

    render(){
        let tracks;
        let trackList;
        if (this.props.tracks) {
            tracks = Object.keys(this.props.tracks).map(id => this.props.tracks[id])
            trackList = tracks.map(track => {return (
                <TrackItem 
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
                    track={this.props.tracks[this.props.modal]} 
                    updateTrack={this.props.updateTrack}
                    closeUploadModal={this.props.closeUploadModal}
                />
            )
        } else if (this.props.playlistModal) {

            modalComponent = (
                <PlaylistModal
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
        playlists: state.entities.playlists
    }
}

const mdp = dispatch => {
    return {
        fetchPlaylists: () => dispatch(fetchPlaylists()),
        fetchUserTracks: user => dispatch(fetchUserTracks(user)),
        updateTrack: (track, id) => dispatch(updateTrack(track, id)),
        deleteTrack: id => dispatch(deleteTrack(id)),
        openUploadModal: (trackId) => dispatch(openUploadModal(trackId)),
        openPlaylistModal: (id, playlistType) => dispatch(openPlaylistModal(id, playlistType)),
        closeUploadModal: () => dispatch(closeUploadModal()),
        closeModal: () => dispatch(closeModal())
    }
}

export default connect(msp, mdp)(Tracks);
