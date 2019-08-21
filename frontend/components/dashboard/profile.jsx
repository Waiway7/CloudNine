import React from "react";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import ProfileTracks from './profile_tracks'

class UserProfile extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
        let linkTrack = "dashboard-link"
        let linkPlaylist = "dashboard-link"
        let index;
        const {params} = this.props.match
        const path = this.props.location.pathname || null
        if (path.includes("tracks")) {
            linkTrack = "dashboard-link targeted"
            index = <ProfileTracks />
        }
        else if (path.includes("playlists")){
             linkPlaylist = "dashboard-link targeted"
        }
       return( 
       <div className="body">
           <div className="dashboard-header">
               <div className="header-content-container">
                    <img src="https://cloudnine-upload-dev.s3.amazonaws.com/starecat.jpg" className="profile-pic"></img>
                <div className="right-content-info">
                    <div className="header-content-username">{params.currentUsername}</div>
                </div>
                <div className="profile-links">
                    <Link to={`/profile/${params.currentUsername}/${params.currentUserId}/tracks`} style={{textDecoration: 'none'}} >
                        <div className={linkTrack}>Tracks</div>
                    </Link>
                    <Link to={`/profile/${params.currentUsername}/${params.currentUserId}/playlists`} style={{textDecoration: 'none'}} >
                        <div className={linkPlaylist}>Playlists</div>
                    </Link>
                </div>
                
                <div className="track-list-container">
                    {index}
                </div>
               </div>
           </div>
        </div>
       )}
}

const msp = (state, ownProps) => {
    return {
        currentUser: state.session.id
    }
}

const mdp = (mdp) => {
    return {}
}
export default (UserProfile);