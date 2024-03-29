import React from 'react';
import {connect} from 'react-redux'

class UpdateModal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: this.props.track.title, 
            description: this.props.track.description, 
            image: this.props.track.imageUrl,
            audio: this.props.track.audioUrl,
            playlistId: null,
            uploaderId: this.props.track.uploader_id,
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
        formData.append('track[title]', this.state.title);
        formData.append('track[playlist_id]', this.state.playlistId);
        formData.append('track[description]', this.state.description);
        // formData.append('track[audio]', this.state.audio);
        formData.append('track[uploader_id]', this.state.uploaderId);
        if (this.state.image) {
            formData.append('track[image]', this.state.image)
        }
        this.props.updateTrack(formData, this.props.track.id).then(() => this.closeModal())
    }

    render () {
        const preview = this.state.imagePreview ? <img className="empty-profile" src={this.state.imagePreview} /> :
            <img className="empty-profile" src={this.state.image} />
        return (
                <div className="modal-background" onClick={() => this.closeModal()}>
                    <div className="upload-dropdown">
                <div className="form-upload-main">
                    <div className="container-upload" onClick={e => e.stopPropagation()}>  
                    <div className="form-nav">
                        <div className="basic-info">Basic info</div>
                    </div>
                    <form id="form-upload" className="upload-form" onSubmit={this.handleSubmit}>
                        <div className="container-content">
                            <div className="edit-picture">
                                {preview}
                                <label className="image" htmlFor="image-file"><i className="fas fa-camera"></i><p className="upload-text">Upload Picture</p></label>
                            </div>
                            <div className="right-side-form">
                                <div className="upload-title">
                                    <div className="title-string">Title</div><div className="ast">*</div>
                                    <input 
                                        type="text" 
                                        className="track-title"
                                        value={this.state.title}
                                        onChange={this.update('title')}
                                    />
                                </div>
                                <div className="upload-description">
                                    <div className="description">Description</div>
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
                       
                        <div className="footer-upload">
                            <div className="aster">*</div><div className="require">Required</div>
                            <div className="upload-buttons">
                                <button className="cancel-btn" onClick={this.closeModal}>Cancel</button>
                                <button className="upload-btn">Update</button>
                            </div>
                        </div>
                        
                    </form>
                    </div>
                </div>
            </div>
                </div>
        )
    }
}



export default UpdateModal