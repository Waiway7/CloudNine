import React from 'react';
import { createTrack } from '../../actions/track_actions'
import { connect } from 'react-redux';
import {openUploadModal, closeUploadModal} from '../../actions/modal_actions'

class UploadTrack extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: "", 
            description: "", 
            image: null,
            audio: null,
            uploaderId: this.props.currentUser.id,
            };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.uploadModal = this.props.uploadModal.bind(this);
    }

    update(field) {
        return (e) => this.setState({[field]: e.target.value})
    }

    handleImageFile(e) {
        this.setState({image: e.currentTarget.files[0]})
    }

    handleAudioFile(e) {
        this.setState({audio: e.currentTarget.files[0]})
    }

    handleSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('track[title]', this.state.title);
        formData.append('track[description]', this.state.description);
        formData.append('track[audio]', this.state.audio);
        formData.append('track[uploader_id]', this.state.uploaderId);
        if (this.state.image) {
            formData.append('track[image]', this.state.image)
        }
        this.props.uploadTrack(this.formData)
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
        if (!this.props.modal){
            return null;
        }
        let componentContainer;
        switch (this.props.modal){
            case 'upload': componentContainer = 
                <form className="upload-form">
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
                        className="track"

                        onChange={this.handleAudioFile.bind(this)}
                    />
                    <input 
                        type="file" 
                        className="track-image"
                        onChange={this.handleImageFile.bind(this)}
                    />
                    <button className="upload-btn" onClick={this.handleSubmit}>Upload</button>
                    <button className="cancel-btn" onClick={this.handleCancel}>Cancel</button>
                </form>
                break;
            default:
                return null;
        }
        return componentContainer
    }

    render () {
        return (
            <div className="upload-page">
                <button onClick={() => this.uploadModal()} className="upload-btn-form">
                    Choose to Upload an Audio
                </button>
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
        uploadModal: () => dispatch(openUploadModal('upload')),
        // closeModal: () => dispatch(closeUploadModal())
    }
}

export default connect(msp, mdp)(UploadTrack)