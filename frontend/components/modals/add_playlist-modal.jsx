import React from "react";
import {connect} from "react-redux";
import {fetchPlaylists} from "../../actions/playlist_actions"

class AddTrackToPlaylists extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchPlaylists()
    }

    render() {
        return (
            <div>
            </div>
        )
    }
}

const msp = (state) => {
    return {
        playlists: state.entities.playlists
    }
}

const mdp = (dispatch) => {
    return {
        fetchPlaylists: () => dispatch(fetchPlaylists())
    }
}

export default connect(msp, mdp)(AddTrackToPlaylists)