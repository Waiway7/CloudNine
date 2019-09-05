import React from "react";
import {Link} from 'react-router-dom'
import ProfileTracks from './profile_tracks';
import ProfilePlaylists from "./profile_playlists";

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
            linkTrack = "targeted"
            index = <ProfileTracks />
        }
        else if (path.includes("playlists")){
             linkPlaylist = "targeted"
             index = <ProfilePlaylists />
        }
       return( 
       <div className="body">
           <div className="dashboard-header">
               <div className="header-content-container">
                    <img src="https://cloudnine-upload-dev.s3.amazonaws.com/starecat.jpg" className="profile-pic"></img>
                    <div className="right-content-info">
                    <div className="header-content-username">{params.currentUsername}</div>
                    </div>
                </div>
<<<<<<< HEAD
               </div>
           </div>
           <div className="body-container-for-dashboard">
           <div className="profile-links">
                    <Link to={`/profile/${params.currentUsername}/${params.currentUserId}/tracks`} style={{textDecoration: 'none'}} >
                        <div className={linkTrack}>Tracks</div>
                    </Link>
                    <Link to={`/profile/${params.currentUsername}/${params.currentUserId}/playlists`} style={{textDecoration: 'none'}} >
                        <div className={linkPlaylist}>Playlists</div>
                    </Link>
=======
           </div>
           <div className="profile-links-container-index">
                <div className="profile-links">
                        <Link to={`/profile/${params.currentUsername}/${params.currentUserId}/tracks`} style={{textDecoration: 'none'}} >
                            <div className={linkTrack}>Tracks</div>
                        </Link>
                        <Link to={`/profile/${params.currentUsername}/${params.currentUserId}/playlists`} style={{textDecoration: 'none'}} >
                            <div className={linkPlaylist}>Playlists</div>
                        </Link>
>>>>>>> showcase
                </div>
            </div>
            <div className="track-list-container-index">
                <div className="track-list-container profile-index">
                    {index}
<<<<<<< HEAD
            </div>
           <div className="github-links">
                    
=======
                </div>
>>>>>>> showcase
            </div>
            </div>
        </div>
       )}
}

export default (UserProfile);