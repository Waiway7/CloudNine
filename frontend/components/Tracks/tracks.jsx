import React from 'react';
import { connect } from 'react-redux';
import {fetchUserTracks} from '../../actions/track_actions'

class Tracks extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchUserTracks(this.props.currentUser)
        debugger
    }

    render(){
        const tracks = Object.keys(this.props.tracks).map(id => this.props.tracks[id])
        const trackList = Object.keys(tracks).map(track => {return (
            <li key={`track-id${track.id}`}></li>
        )})
        return (
            <div className="track-list">
            </div>
        )
    }
}

const msp = (state) => {
    return {
        currentUser: state.session.id,
        tracks: state.entities.tracks
    }
}

const mdp = dispatch => {
    debugger
    return {
        fetchUserTracks: user => dispatch(fetchUserTracks(user))
    }
}

export default connect(msp, mdp)(Tracks);
