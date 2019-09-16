import React from 'react';
import {connect} from "react-redux";
import {updatePlaylist} from "../../actions/playlist_actions";
import {closeModal} from "../../actions/modal_actions"

class UpdatePlaylistItem extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: this.props.playlist.title, 
            description: this.props.playlist.description || "", 
            image: this.props.playlist.imageUrl,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeModal = this.props.closeModal.bind(this)
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
        // formData.append('playlist[audio]', this.state.audio);
        formData.append('playlist[uploader_id]', this.state.uploaderId);
        if (this.state.image) {
            formData.append('playlist[image]', this.state.image)
        }
        this.props.updatePlaylist(formData, this.props.playlist.id).then(() => this.closeModal())
    }

    render () {
        const preview = this.state.imagePreview ? <img className="empty-profile" src={this.state.imagePreview} /> :
            <img className="empty-profile" src={this.state.image} />
        return (
                    <form id="form-upload" className="upload-form" onSubmit={this.handleSubmit}>
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
                       
                        <div className="options-edit-playlist">
                            <div className="container-require">
                                <div className="playlist-ast">*</div>
                                <div className="playlist-require">Required</div>
                            </div>
                            <div className="update-buttons-playlist">
                                <div className="cancel-btn-playlist" onClick={this.closeModal}>Cancel</div>
                                <div className="upload-btn-playlist">Update</div>
                            </div>
                        </div>
                        
                    </form>
        )
    }
}

const msp = (state) => {
    return {
        
    }
}

const mdp = (dispatch) => {
    return {
        updatePlaylist: (playlist, id) => dispatch(updatePlaylist(playlist, id)),
        closeModal: () => dispatch(closeModal()),
    }
}


export default connect(msp, mdp)(UpdatePlaylistItem)