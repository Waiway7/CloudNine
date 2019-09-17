import React from 'react';
import {connect} from "react-redux";
import {updatePlaylist} from "../../actions/playlist_actions";
import {deletePlaylistTracks} from "../../actions/playlist_tracks_actions"
import {closeModal} from "../../actions/modal_actions"

class UpdatePlaylistItem extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: this.props.playlist.title, 
            description: this.props.playlist.description || "", 
            image: this.props.playlist.imageUrl,
            tracks: this.props.tracks[this.props.playlist.id],
            deleteTracks: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeModal = this.props.closeModal.bind(this);
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete(e){
        const value = e.currentTarget.id;
        const newState = Object.assign({}, this.state.tracks);
        let deleteState = Object.assign({}, this.state.deleteTracks);
        deleteState[value] = this.props.tracks[this.props.playlist.id][value]
        delete newState[value];
        this.setState({tracks: newState, deleteTracks: deleteState})
    }

    handleImageFile(e) {
        const imageFile = e.currentTarget.files[0]
        const imagetype = e.currentTarget.files[0].type.search("image")
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            this.setState({image: imageFile, imagePreview: fileReader.result})
        }
        
        if (imagetype != -1){
            fileReader.readAsDataURL(imageFile);
        }
    }
    
    update(field) {
        return (e) => this.setState({[field]: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('playlist[title]', this.state.title);
        formData.append('playlist[description]', this.state.description);
        formData.append('playlist[uploader_id]', this.state.uploaderId);
        if (this.state.image) {
            formData.append('playlist[image]', this.state.image)
        }
        if (Object.keys(this.state.deleteTracks).length > 0){
            const trackIds = Object.keys(this.state.deleteTracks);
            this.props.removePlaylistTracks(trackIds, this.props.playlist.id)
        }
        this.props.updatePlaylist(formData, this.props.playlist.id)
            .then(() => {
                this.closeModal()})
    }

    render () {
        const preview = this.state.imagePreview ? <img className="empty-profile" src={this.state.imagePreview} /> :
            <img className="empty-profile" src={this.state.image} />
        let updateModal;
        if (this.props.modal[1] === "updatePlaylist"){
            updateModal = <form id="form-upload" className="upload-form" onSubmit={this.handleSubmit}>
                            <div className="playlist-edit-container">
                                <div className="edit-picture">
                                    {preview}
                                <label className="image" htmlFor="image-file"><i className="fas fa-camera"></i><p className="upload-text">Upload Picture</p></label>
                            </div>
                            <div className="playlist-right-side-info">
                                <div className="playlist-title-container-update">
                                    <div className="title-text-playlist-update-container">
                                        <div className="playlist-title-string">Title</div>
                                        <div className="playlist-ast">*</div>
                                    </div>
                                    <input 
                                        type="text" 
                                        className="track-title"
                                        value={this.state.title}
                                        onChange={this.update('title')}
                                    />
                                </div>
                                <div className="playlist-description-edit-container">
                                    <div className="description-playlist">Description</div>
                                    <textarea
                                        type="text" 
                                        className="track-description"
                                        value={this.state.description}
                                        onChange={this.update('description')}
                                    />
                                </div>
                                <input 
                                    type="file" 
                                    id="image-file"
                                    className="track-image"
                                    onChange={this.handleImageFile.bind(this)}
                                />
                            </div>
                        </div>
                        
                    </form>
        } else if (this.props.modal[1] === "deletePlaylistTracks") {
            if (Object.keys(this.state.tracks).length > 0){
                const playlistTracks = this.state.tracks
                updateModal = Object.keys(this.state.tracks).map((id) => {
                    const track = playlistTracks[id];
                    return (
                        <div key={`playlist-track-${id}`} className="list-playlist-tracks-select">
                            <div className="container-playlist-list-track-info">
                                <img className="track-img-playlist-track" src={track.imageUrl}/>
                                <div className="track-title-playlist-track">{track.title}</div>
                            </div>
                            <div className="delete-playlist-track-now-container">
                                <i id={id} className="fas fa-times delete-playlist-track-now" onClick={this.handleDelete}></i>
                            </div>
                        </div>
                    )
            })}
            else {
                updateModal = <div className="empty-state-tracks"></div>
            }
        }
        
        return (
            <div className="container-update-modal-playlist-track">
                {updateModal}  
                <div className="options-edit-playlist">
                            <div className="container-require">
                                <div className="playlist-ast">*</div>
                                <div className="playlist-require">Required</div>
                            </div>
                            <div className="update-buttons-playlist">
                                <div className="cancel-btn-playlist" onClick={this.closeModal}>Cancel</div>
                                <div className="upload-btn-playlist" onClick={this.handleSubmit}>Update</div>
                            </div>
                </div>
            </div> 
            
        )
    }
}

const msp = (state) => {
    return {
        modal: state.ui.playlistModal
    }
}

const mdp = (dispatch) => {
    return {
        updatePlaylist: (playlist, id) => dispatch(updatePlaylist(playlist, id)),
        closeModal: () => dispatch(closeModal()),
        removePlaylistTracks: (trackIds, playlistId) => dispatch(deletePlaylistTracks(trackIds, playlistId))
    }
}


export default connect(msp, mdp)(UpdatePlaylistItem)