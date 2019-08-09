import React from 'react';
import { createTrack } from '../../actions/track_actions'
import { connect } from 'react-redux';
import UserNav from '../current_user_tracks/user_nav';
import {Link, withRouter} from 'react-router-dom';

class UploadTrack extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: "", 
            description: "", 
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
    //     } else {this.setState({image: e.currentTarget.files[0]})
    // }
    // }

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
        this.props.uploadTrack(formData).then(() => this.props.history.push(`/you/library`))
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
        const preview = this.state.imagePreview ? 
            <img className="empty-profile" src={this.state.imagePreview} /> :
            <div className="empty-profile"></div>
       if (this.state.audio){
            formComponent = 
            <div className="upload-dropdown">
                <div className="form-upload-main">
                    <div className="container-upload">  
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
                            </div>
                        </div>
                       
                        <div className="footer-upload">
                            <div className="aster">*</div><div className="require">Required</div>
                            <div className="upload-buttons">
                                <button className="cancel-btn" onClick={this.handleCancel}>Cancel</button>
                                <button className="upload-btn">Upload</button>
                            </div>
                        </div>

                        <input 
                            type="file" 
                            id="image-file"
                            className="track-image"
                            onChange={this.handleImageFile.bind(this)}
                        />
                        
                    </form>
                    </div>
                </div>
            </div>
                
       }
       
        return formComponent
    }

    render () {
        let transition
        if (this.uploadForm()) {
            transition = 
            <div className="upload-shrink-container">
                <div className="upload-meter"></div>
                <div className="shrink-upload-container">
                    <h1 className="upload-header">Upload your songs to the cloud</h1>
                    <input 
                            type="file" 
                            id="audio-file"
                            form="form-upload"
                            className="hidden"
                            onClick={this.handleAudioFile}
                    />
                    <label className="choose-file" htmlFor="audio-file">choose file to upload</label>
                </div>
                <div className="best-type">Provide FLAC, WAV, ALAC or AIFF for best audio quality.</div>
            </div>
        } else { 
            transition =
            <div className="upload-form-container">
                <div className="upload-meter"></div>
                <div className="upload-main-container">
                <h1 className="upload-header">Upload your songs to the cloud</h1>
                <input 
                        type="file" 
                        id="audio-file"
                        form="form-upload"
                        className="hidden"
                        onChange={this.handleAudioFile}
                />
                <label className="choose-file" htmlFor="audio-file">choose file to upload</label>
                </div> 
                <div className="best-type">Provide FLAC, WAV, ALAC or AIFF for best audio quality.</div>
            </div>
        }
        return (
            <div className="body">
                <UserNav pathname={this.props.location.pathname}/>
                <div className="fillblock"></div>
                <div className="upload-page">
                    {transition}
                </div>
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

export default withRouter(connect(msp, mdp)(UploadTrack));