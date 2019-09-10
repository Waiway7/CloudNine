import React from "react"

class PlaylistTracks extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            hover: false,
            view: false,
            id: ""
        }
        this.onView = this.onView.bind(this);
        this.offView = this.offView.bind(this);
        this.selectAudio = this.selectAudio.bind(this);
    }

    onView(){
        this.setState({view: true})
    }

    offView(){
        this.setState({view: false})
    }

    selectAudio(e){
        const value = e.currentTarget.id;
        this.setState({id: value});
    }

    render() {
        let expand;
        let viewable;
        if (Object.keys(this.props.tracks).length > 5 && this.state.view === false){
            expand = <div className="show-all" onClick={this.onView}>
                        {`View ${Object.keys(this.props.tracks).length} tracks`}
                    </div>
            viewable = "list-track-playlist-container view-tracks"
        } else if (Object.keys(this.props.tracks).length > 5 && this.state.view === true) {
            expand = <div className="show-all" onClick={this.offView}>
                        View fewer tracks
                     </div>
            viewable = "list-track-playlist-container hide-tracks"
        } else if (Object.keys(this.props.tracks).length <= 5) {
            viewable = "list-track-playlist-container"
        }
        const playlistTracks = Object.keys(this.props.tracks).map ((id, idx) => {
            const track = this.props.tracks[id];
            const selectedTrack = id === this.state.id ? "selected-track-from-playlist" : "";
            return (
                <li key={`track-${id}`} 
                    id={track.id}
                    className={`${viewable} ${selectedTrack}`}
                    onClick={this.selectAudio}
                    >
                    <div className="center-list-track-playlist-container">
                    <div className="container-for-img-track-list">
                        <img className="img-track-playlist-index" src={track.imageUrl}/>
                    </div>
                    <div className={`text-list-track-playlist-container ${selectedTrack}`}>
                        <div className={`playlist-track-order ${selectedTrack}`}>{idx + 1}</div>
                        <div className={`title-track-playlist-list ${selectedTrack}`}>{track.title}</div>
                        <div className={`dash-sep ${selectedTrack}`}>-</div>
                        <div className={`creater-track-playlist-list ${selectedTrack}`}>cloudnine</div>
                    </div>
                    </div>
                </li>
    
            )
        })
        
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

export default PlaylistTracks 



