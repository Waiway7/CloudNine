import React from 'react';
import UploadModal from "./modal_update"
import Music from "./play_test";

const TrackItem = ({track, modal, updateTrack, deleteTrack, openUploadModal, closeUploadModal}) => {
    return (
        <li className={`audio${track.id}`}>
            <img key={`img-${track.id}`} className="preview" src={track.imageUrl} />
            <button className={`delete-btn${track.id}`} onClick={() => deleteTrack(track.id)}>delete</button>
            <button className={`update-btn${track.id}`} onClick={() => openUploadModal(track.id)}>modal</button> 
            <Music track={track}/>
        </li>
    )
} 

export default TrackItem;



