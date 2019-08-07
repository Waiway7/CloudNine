import React from 'react';
import { createTrack } from '../../actions/track_actions'
import { connect } from 'react-redux';

class UploadTrack extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: "", 
            description: "", 
            image: null,
            audio: null,
            playlistId: null,
            uploaderId: this.props.currentUser.id,
            };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleAudioFile = this.handleAudioFile.bind(this);
    }

    update(field) {
        return (e) => this.setState({[field]: e.target.value})
    }

    handleImageFile(e) {
        const imagetype = e.currentTarget.files[0].type.search("image")
        if (imagetype === 0){
            this.setState({image: e.currentTarget.files[0]})
        } else {this.setState({image: e.currentTarget.files[0]})
    }

    }

    handleAudioFile(e) {
        
        const audiotype = e.currentTarget.files[0].type.search("audio");
        if (audiotype === 0){
            this.setState({audio: e.currentTarget.files[0]});
        }
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
        this.props.uploadTrack(formData)
    }
    
    handleCancel(e){
        e.preventDefault();
        this.setState({
            title: "", 
            description: "", 
            image: null,
            audio: null,
            uploaderId: this.props.currentUser.id,
        })
    }

    uploadForm(){
        let formComponent;
       if (this.state.audio){
            formComponent = 
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
                    <button className="cancel-btn" onClick={this.handleCancel}>Cancel</button>
                </form>
                
       }
        return formComponent
    }

    render () {
        return (
            <div className="upload-page">
                <input 
                        type="file" 
                        id="audio-file"
                        form="form-upload"
                        className="hidden"
                        onChange={this.handleAudioFile}
                />
                <label htmlFor="audio-file">choose file to upload</label>
                {this.uploadForm()}
            </div>
        )
    }
}

const msp = (state) => {
    return {
        currentUser: state.session.id,
        modal: state.ui.uploadModal
    }
}

const mdp = (dispatch) => {
    return {
        uploadTrack: (track) => dispatch(createTrack(track)),
    }
}

export default connect(msp, mdp)(UploadTrack)