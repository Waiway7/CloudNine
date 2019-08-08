import React from 'react';
import UploadModal from "./modal_update"
import Music from "./play_test";

const TrackItem = ({track, modal, updateTrack, deleteTrack, openUploadModal, closeUploadModal}) => {

    // const trackImage = new Image(100, 200);
    // trackImage.src = 'track.jpg'

    return (
        <li className={`audio${track.id}`}>
            <img key={`img-${track.id}`} className="preview" src={track.imageUrl} />
            <button className={`delete-btn${track.id}`} onClick={() => deleteTrack(track.id)}>delete</button>
            <button className={`update-btn${track.id}`} onClick={() => openUploadModal(track.id)}>modal</button> 
            {/* will dispatch a player action add the track to the state and play as well */}
            <Music track={track}/>
        </li>
    )
} 

export default TrackItem;



