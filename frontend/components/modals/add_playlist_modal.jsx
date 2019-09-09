import React from "react";
import {connect} from "react-redux";
import {fetchPlaylists} from "../../actions/playlist_actions";
import {deletePlaylistTrack, addPlaylistTracks} from "../../actions/playlist_tracks_actions"
import {removeCurrentAudio} from "../../actions/user_actions"
import AddPlaylistItem from "./add_playlist_item"

class AddTrackToPlaylists extends React.Component {
    constructor(props){
        super(props)
        this.deleteTrackFromPlaylist = this.deleteTrackToPlaylist.bind(this)
        this.addTrackToPlaylist = this.addTracktoPlaylist.bind(this)
    }

    componentDidMount(){
        this.props.fetchPlaylists()
    }

    deleteTrackToPlaylist(e){
        const value = e.currentTarget.id;
        // if (this.props.playlists[value].id && Object.keys(this.props.currentTrack).length > 0) {
        //     this.props.currentTrack.pause();
        //     this.props.removeCurrentAudio()
        // }
        this.props.deletePlaylistTrack(this.props.trackId, value)
    }

    addTracktoPlaylist(e){
        const value = e.currentTarget.id;
        this.props.addPlaylistTracks(value, [this.props.trackId]);
    }

    render() {
        let addTrackModal;
        if (Object.keys(this.props.playlists).length !== undefined) {
            addTrackModal = <AddPlaylistItem 
                tracks={this.props.tracks}
                trackId={this.props.trackId}
                playlists={this.props.playlists}
                removeTrack={this.deleteTrackFromPlaylist}
                addTrack={this.addTrackToPlaylist}
            />
        }
        return (
            <div className="playlist-list-scroll">
                {addTrackModal}
            </div>
        )
    }
}

const msp = (state) => {
    return {
        playlists: state.entities.playlists,
        tracks: state.entities.tracks,
        currentTrack: state.entities.currentTrack
    }
}

const mdp = (dispatch) => {
    return {
        fetchPlaylists: () => dispatch(fetchPlaylists()),
        deletePlaylistTrack: (trackId, playlistId) => dispatch(deletePlaylistTrack(trackId, playlistId)),
        addPlaylistTracks: (playlistId, trackId) => dispatch(addPlaylistTracks(playlistId, trackId)),
        removeCurrentAudio: () => dispatch(removeCurrentAudio())
    }
}

export default connect(msp, mdp)(AddTrackToPlaylists)