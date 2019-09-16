
import React from 'react';
import {connect} from "react-redux";
import {openPlaylistModal ,closeModal} from "../../actions/modal_actions"
import UpdatePlaylistItem from "./edit_playlist_item"

class UpdatePlaylist extends React.Component{
    constructor(props){
        super(props)
        this.closeModal = this.props.closeModal.bind(this)
        this.updatePlaylistInfo = this.updatePlaylistInfo.bind(this)
        this.deletePlaylistTracks = this.deletePlaylistTracks.bind(this)
    }

    updatePlaylistInfo(){
        this.props.openModal(this.props.playlist.id, "updatePlaylist")
    }

    deletePlaylistTracks(){
        this.props.openModal(this.props.playlist.id, "deletePlaylistTracks")
    }

    render () {
        let modal;
        let targetBasic = "nav-info-session";
        let targetDelete = "nav-info-session";
        if (this.props.modal === "updatePlaylist"){
            modal = <UpdatePlaylistItem 
                        playlist={this.props.playlist}
                        tracks={this.props.tracks}
                    />
            targetBasic = "targeted-basic-info"
        }
        else if (this.props.modal === "deletePlaylistTracks"){
            modal;
            targetDelete = "targeted-delete-tracks-info"
        }
        return (
            <div className="modal-background" onClick={this.closeModal}>
                <div className="close-x-btn" onClick={this.closeModal}>X</div>
                <div className="update-playlist-info-container" onClick={e => e.stopPropagation()}>  
                    <div className="padding-container-update-playlist"> 
                        <div className="container-header-playlist-info">
                            <div className={targetBasic} 
                                onClick={this.updatePlaylistInfo}>
                                Basic info
                            </div>
                            <div className={targetDelete}
                                onClick={this.deletePlaylistTracks}>
                                Tracks
                            </div>
                        </div>
                        {modal}
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
        openModal: (id, modal) => dispatch(openPlaylistModal(id, modal)),
        closeModal: () => dispatch(closeModal()),
    }
}


export default connect(msp, mdp)(UpdatePlaylist)