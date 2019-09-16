import React from 'react';
import { connect } from 'react-redux';
import { fetchPlaylists, updatePlaylist, deletePlaylist} from '../../actions/playlist_actions';
import {openUploadModal, closeUploadModal} from '../../actions/modal_actions';
import {fetchPlaylistsTracks} from "../../actions/playlist_tracks_actions";
import PlaylistItem from './profile_playlists_items';
import DeletePlaylistModal from '../modals/delete_modal';
import {fetchAllUsers} from "../../actions/user_actions";
import UpdatePlaylist from "../modals/edit_playlist_modal";


class Playlists extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loaded: null
        }
        
    }

    componentDidMount(){
        this.props.fetchAllUsers();
        this.props.fetchPlaylists(this.props.userId)
            .then( (playlists) => 
                this.props.fetchPlaylistsTracks(Object.keys(playlists.playlists)[0]))
                .then(() => 
                    this.setState({loaded: true})) 
        
        window.scrollTo(0, 0)
    }

    render(){
        let playlistList;
        if (Object.keys(this.props.playlists).length > 0 && this.state.loaded === true) {
            const tracks = this.props.playlistTracks
            const playlists = this.props.playlists
            const users = this.props.users
            const playlist = Object.keys(this.props.playlists).map(id => {
                return (
                <PlaylistItem 
                    key={`playlist-id${playlists[id].id}`} 
                    playlist={playlists[id]}
                    tracks={tracks[id]}
                    users={users}
                />)})
            playlistList = <ul className="index-list-tracks">{playlist}</ul>
        } 
        else if (Object.keys(this.props.playlists).length === 0 && this.state.loaded === true){
            playlistList = <div className="container-no-playlists">
                <i className="far fa-list-alt fa-10x playlist-icon"></i>
                <div className="text-no-playlists">You haven't created any playlists.</div>
            </div>
        }

        let modalComponent;
        if (this.props.modal && this.props.modal[1] === "updatePlaylist"){
            modalComponent = (
                <UpdatePlaylist 
                    playlist={this.props.playlists[this.props.modal[0]]}
                    tracks={this.props.playlistTracks}
                    modal={this.props.modal[1]}
                />
            )
        }
        if (this.props.modal && this.props.modal[1] === "deletePlaylist") {
            modalComponent = (
                <DeletePlaylistModal 
                    playlist={this.props.playlists[this.props.modal[0]]} 
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
        modal: state.ui.playlistModal,
        users: state.entities.users
    }
}

const mdp = dispatch => {
    return {
        fetchAllUsers: () => dispatch(fetchAllUsers()),
        fetchPlaylistsTracks: (userId) => dispatch(fetchPlaylistsTracks(userId)),
        fetchPlaylists: (userId) => dispatch(fetchPlaylists(userId)),
        updatePlaylist: (playlist, id) => dispatch(updatePlaylist(playlist, id)),
        deletePlaylist: id => dispatch(deletePlaylist(id)),
        closeUploadModal: () => dispatch(closeUploadModal())
    }
}


export default connect(msp, mdp)(Playlists);