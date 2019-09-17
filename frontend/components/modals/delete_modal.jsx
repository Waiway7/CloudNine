import React from "react";
import {connect} from "react-redux";
import {closeModal} from "../../actions/modal_actions";
import {fetchPlaylists, deletePlaylist} from "../../actions/playlist_actions"
import {fetchPlaylistsTracks} from "../../actions/playlist_tracks_actions"

 
class DeletePlaylistModal extends React.Component {
    constructor(props){
        super(props)
        this.handleCancel = this.props.closeModal.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete(e){
        this.props.deletePlaylist(this.props.playlist.id)
        this.handleCancel();
    }

    render() {
        return (
            <div className="modal-background" onClick={this.handleCancel}>
            <div className="close-x-btn" onClick={this.handleCancel}>X</div>
            <div className="delete-playlist-modal-container" onClick={e => e.stopPropagation()}>
            <div className="container-delete-form-modal">
                <h1 className="delete-playlist-header">
                    Delete playlist
                </h1>
                <p className="text-delete-playlist">{`Are you sure you want to delete ${this.props.playlist.title}? This action cannot be undone.`}</p>
                <div className="btns-delete-playlist-modal-container">
                    <div className="btns-delete-playlist-form-container">
                    <div className="cancel-btn-playlist-delete" onClick={this.handleCancel}>
                        Cancel
                    </div>
                    <div className="delete-btn-playlist-delete" onClick={this.handleDelete}>
                        Delete
                    </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        )
    }
}

const msp = (state) => {
   return {

   }
}

const mdp = (dispatch) => {
    return {
        closeModal: () => dispatch(closeModal()),
        deletePlaylist: (id) => dispatch(deletePlaylist(id)),
        fetchPlaylistsTracks: () => dispatch(fetchPlaylistsTracks()),
        fetchPlaylists: () => dispatch(fetchPlaylists()),
    }
}

export default connect(msp, mdp)(DeletePlaylistModal);