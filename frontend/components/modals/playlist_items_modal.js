import React from 'react'

export default ({deleteTrack, addTrack, trackIds, tracks}) => {
    let addedTracks;
    if (Object.keys(trackIds).length === 0 && trackIds.constructor === Object){
        addedTracks;
    } else {
        let trackArr = Object.keys(trackIds);
        if (trackArr.length < 4 && typeof deleteTrack === "function"){
            for (let i = trackArr.length; i < 4; i++){
                trackArr.push(0)
            }
        }
        addedTracks = trackArr.map( (id, idx) => {
        const track = tracks[id]
        let deleteTrackX;
            if (typeof deleteTrack === "function"){
                deleteTrackX = <i id={id} className="fas fa-times delete-title-track" onClick={deleteTrack.bind(this)}></i>
            }
            if (id === 0) {
                return (
                    <li key={`empty-${idx}`}>
                        <div className="compact"></div>
                    </li>)
            } else {
                return (
                    <li key={`trackPlaylist-${id}`}>
                        <div className="compact">
                            <div className="addedImgTrack"><img className="add-track-img" src={track.imageUrl}/></div>
                            <div className="added-uploader-name">CloudNine</div>
                            <div className="dash"> - </div>
                            <div className="added-title-track">{track.title}</div>
                            {deleteTrackX}
                        </div>
                    </li>
        )}}
    )}
    return (
        <div className="playlist-track-added">
            <ul className="list-of-added">
                {addedTracks}
            </ul>
        </div>
    )
}

