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
            // imagePreview: this.props.track.imageUrl
        }
        this.handleSubmit = this.handleSubmit.bind(this)
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
        // this.setState({image: e.currentTarget.files[0]})
    }

    // handleImageFile(e) {
    //     const imagetype = e.currentTarget.files[0].type.search("image")
    //     if (imagetype === 0){
    //         this.setState({image: e.currentTarget.files[0]})
    //     } 
    // }
    
    update(field) {
        return (e) => this.setState({[field]: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('track[title]', this.state.title);
        formData.append('track[playlist_id]', this.state.playlistId);
        formData.append('track[description]', this.state.description);
        formData.append('track[audio]', this.state.audio);
        formData.append('track[uploader_id]', this.state.uploaderId);
        if (this.state.image) {
            formData.append('track[image]', this.state.image)
        }
        this.props.updateTrack(formData, this.props.track.id)
    }

    render () {
        const preview = this.state.imagePreview ? <img src={this.state.imagePreview} /> :
            <img src={this.state.image} />
        return (
            <div className="update-form">
                {preview}
                <form id="form-upload" className="upload-form" onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        className="track-title"
                        value={this.state.title}
                        onChange={this.update('title')}
                    />
                    <textarea
                        type="text" 
                        className="track-description"
                        value={this.state.description}
                        onChange={this.update('description')}
                    />
                    <input 
                        type="file" 
                        className="track-image"
                        onChange={this.handleImageFile.bind(this)}
                    />
                    <button className="upload-btn">Upload</button>
                    <button className="cancel-btn" onClick={this.props.closeUploadModal}>Cancel</button>
                </form>
            </div>
        )
    }
}

export default UpdateModal