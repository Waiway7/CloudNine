import React from 'react';
import { connect } from 'react-redux';
import { fetchPlaylists, updatePlaylist, deletePlaylist} from '../../actions/playlist_actions';
import {openUploadModal, closeUploadModal} from '../../actions/modal_actions';
import {fetchPlaylistsTracks} from "../../actions/playlist_tracks_actions"
import PlaylistItem from './profile_playlists_items'
import UpdateModal from '../current_user_tracks/modal_update'

class Playlists extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loaded: null
        }

    }

    componentDidMount(){
        this.props.fetchPlaylistsTracks().then(() => this.props.fetchPlaylists().then( () => 
            this.setState({loaded: true}))
        );
    }

    render(){
        let playlistList;
        if (Object.keys(this.props.playlists).length > 0 && this.state.loaded === true) {
            const tracks = this.props.playlistTracks
            const playlists = this.props.playlists
            const playlist = Object.keys(this.props.playlists).map(id => {
                return (
                <PlaylistItem 
                    key={`playlist-id${playlists[id].id}`} 
                    playlist={playlists[id]}
                    tracks={tracks[id]}
                />)})
            playlistList = <ul className="index-list-tracks">{playlist}</ul>
        } 
        else if (Object.keys(this.props.playlists).length === 0){
            playlistList = <div className="container-no-playlists">
                <i className="far fa-list-alt fa-10x playlist-icon"></i>
                <div className="text-no-playlists">You haven't created any playlists.</div>
            </div>
        }

        let modalComponent;
        if (this.props.modal) {
            modalComponent = (
                <UpdateModal 
                    playlist={this.props.playlists[this.props.modal]} 
                    updateTrack={this.props.updateTrack}
                    closeUploadModal={this.props.closeUploadModal}
                />
            )
        }

        return (
            <div className="track-index-container">
                <div className="container-tracks">
                    {playlistList}
                </div>
                {modalComponent}
            </div>
        )
    }
}

const msp = (state) => {
    return {
        playlistTracks: state.entities.playlistTracks,
        currentUser: state.session.id,
        playlists: state.entities.playlists,
        modal: state.ui.uploadModal,
    }
}

const mdp = dispatch => {
    return {
        fetchPlaylistsTracks: () => dispatch(fetchPlaylistsTracks()),
        fetchPlaylists: () => dispatch(fetchPlaylists()),
        updatePlaylist: (playlist, id) => dispatch(updatePlaylist(playlist, id)),
        deletePlaylist: id => dispatch(deletePlaylist(id)),
        openUploadModal: (playlistId) => dispatch(openUploadModal(playlistId)),
        closeUploadModal: () => dispatch(closeUploadModal())
    }
}


export default connect(msp, mdp)(Playlists);