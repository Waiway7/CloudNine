import React from 'react';
import {connect} from "react-redux"
import CreatePlaylistModal from "./create_playlist_modal"
import AddTrackToPlaylists from "./add_playlist_modal"

class PlaylistModal extends React.Component{
    constructor(props){
        super(props)
        this.closeModal = this.props.closeModal.bind(this)
    }

    render () {
        // const preview = this.state.imagePreview ? <img className="empty-profile" src={this.state.imagePreview} /> :
        //     <img className="empty-profile" src={this.state.image} />
        let modalType;
        let createModal = "";
        let addModal = "";
        const track = this.props.trackId[0];
        const type = this.props.trackId[1];
        if (type === "create") {
            modalType = <CreatePlaylistModal 
                trackId={this.props.trackId[0]}
            />
            createModal = "target-playlist-modal"
        } else if (type === "add") {
            modalType = <AddTrackToPlaylists
                trackId={this.props.trackId[0]}
            />
            addModal = "target-playlist-modal"
        }

        return (
            <div className="modal-background" onClick={() => this.props.closeModal()}>
                <div className="close-x-btn" onClick={() => this.props.closeModal()}>X</div>
                <div className="modal-create-playlist" onClick={e => e.stopPropagation()}>
                <div className="container-playlist-form">
                <div className="playlist-header-form">
                    <div className={`add-playlist-tracks ${addModal}`} onClick={() => this.props.playlistModal(track, "add")}>Add to playlist</div>
                    <div className={`create-playlist-tracks ${createModal}`} onClick={() => this.props.playlistModal(track, "create")}>Create a playlist</div>
                </div>
                </div>
                    {modalType}
                </div>
            </div>
           
        )
    }
}

export default PlaylistModal;