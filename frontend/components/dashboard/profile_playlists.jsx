import React from 'react';
import { connect } from 'react-redux';
import { fetchPlaylists, updatePlaylist, deletePlaylist} from '../../actions/playlist_actions';
import {openUploadModal, closeUploadModal} from '../../actions/modal_actions';
import PlaylistItem from './profile_playlists_items'
import UpdateModal from '../current_user_tracks/modal_update'

class Playlists extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchPlaylists()
    }

    render(){
        let playlists;
        let playlistList;
        if (this.props.playlists) {
            playlists = Object.keys(this.props.playlists).map(id => this.props.playlists[id])
            playlistList = playlists.map(playlist => {return (
                <PlaylistItem 
                    key={`playlist-id${playlist.id}`} 
                    playlist={playlist}
                    updatePlaylist={this.props.updatePlaylist}
                    deleteTrack={this.props.deletePlaylist}
                    openUploadModal={this.props.openUploadModal}
                    closeUploadModal={this.props.closeUploadModal}
                    modal={this.props.modal}
                    user={this.props.currentUser}
                />
            )})
        } else {
            playlistList = <div className="container-no-playlists">
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
        currentUser: state.session.id,
        playlists: state.entities.playlists,
        modal: state.ui.uploadModal
    }
}

const mdp = dispatch => {
    return {
        fetchPlaylists: () => dispatch(fetchPlaylists()),
        updatePlaylist: (playlist, id) => dispatch(updatePlaylist(playlist, id)),
        deletePlaylist: id => dispatch(deletePlaylist(id)),
        openUploadModal: (playlistId) => dispatch(openUploadModal(playlistId)),
        closeUploadModal: () => dispatch(closeUploadModal())
    }
}


export default connect(msp, mdp)(Playlists);