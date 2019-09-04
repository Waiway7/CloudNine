import React from "react";

export default ({playlists, tracks, trackId, removeTrack, addTrack}) => {
    const track = tracks[trackId]
    const playlistsList = Object.keys(playlists).map(
        (id, idx) => {
            const playlist = playlists[id]
            let addedTrack;
            let imgPlaylist
            if (playlist.track_ids.includes(trackId)){
                addedTrack = <div id={id} className="added-track-btn" onClick={removeTrack.bind(this)}>
                    <p className="added-to-playlist-text">
                        Added
                    </p>
                </div>
            } else {
                addedTrack = <div id={id} className="add-to-playlist-btn" onClick={addTrack.bind(this)}>
                    <p className="add-to-playlist-text">
                        Add to playlist
                    </p>
                </div>
            }
            if (playlist.imageUrl !== undefined) {
                imgPlaylist = <img className="filler-img-playlist" src={playlist.imageUrl}/>
            }
            else if (playlist.track_ids.length === 0){
                imgPlaylist = <div className="filler-img-playlist"></div>
            } else {
                imgPlaylist = <img className="filler-img-playlist" src={tracks[playlist.track_ids[0]].imageUrl}/>
            }
           
            return (
                <li id={`playlist-item-${idx}`} key={`playlists-${id}`} className="item-playlist-container">
                    {imgPlaylist}
                    <div className="playlist-context-item-container">
                        <div className="inner-container-playlist-item-info">
                            <div className="show-playlist-title">{playlist.title}</div>
                            <div className="frequency-container">
                                <i className="fas fa-cloud-upload-alt fa-xs freqency-symbol"></i>
                                <div className="tracks-length">{playlist.track_ids.length}</div>
                            </div>
                        </div>
                    </div>
                    {addedTrack}
                </li>
    )});
    return (
        <div className="playlist-index-add-container">
            <ul className="list-playlists-index-container">
                {playlistsList}
            </ul>
        </div>
    )
}