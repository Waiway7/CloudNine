import React from "react"
import PlaylistTrackItems from "./profile_playlist_tracks_items"

class PlaylistTracks extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            hover: false,
            view: false,
        }
        this.onView = this.onView.bind(this);
        this.offView = this.offView.bind(this);
    }

    onView(){
        this.setState({view: true})
    }

    offView(){
        this.setState({view: false})
    }

    render() {
        let expand = <div></div>
        let viewable = ""
        let playlistTracks;
        const {tracks} = this.props !== undefined ? this.props : {}
        if (tracks !== undefined && Object.keys(tracks).length > 5 && this.state.view === false){
            expand = <div className="show-all" onClick={this.onView}>
                        {`View ${Object.keys(tracks).length} tracks`}
                    </div>
            viewable = "view-tracks"
        } else if (tracks !== undefined && Object.keys(tracks).length > 5 && this.state.view === true) {
            expand = <div className="show-all" onClick={this.offView}>
                        View fewer tracks
                     </div>
            viewable = "hide-tracks"
        } else if (tracks !== undefined && Object.keys(tracks).length <= 5) {
            viewable = ""
        }

        if (tracks !== undefined) {
       
        playlistTracks = Object.keys(tracks).map ((id, idx) => {
            const track = tracks[id];
            const users = this.props.users;
            return (
                <li key={`track-${id}`} className={viewable}>
                    <PlaylistTrackItems 
                        viewable={viewable}
                        idx={idx}
                        track={track}
                        uploader={users[track.uploader_id].username}
                        playlist={this.props.playlist}
                    />
                </li>
    
            )
        })}
        
        return (
            <div className="track-playlist-ul-container">
                <ul className="entire-playlist-tracks">
                    {playlistTracks}
                </ul>
                {expand}
            </div>
        )
    }
}

export default PlaylistTracks;



