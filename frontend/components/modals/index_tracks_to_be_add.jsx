import React from 'react'

export default ({addTracks, addTracktoPlaylist}) => {
    const addTracksList = Object.keys(addTracks).map((id) => {
        return (
            <li key={`addTracks${id}`} className="list-add-tracks">
                <div className="container-div-tracks-add">
                    <img className="img-tracks-add" src={addTracks[id].imageUrl}/>
                    <div className="tracks-container-add-info">
                        <div className="track-add-info-container">
                            <div className="creater-name-add">Cloudnine</div>
                            <div className="add-tracks-title">{addTracks[id].title}</div>
                        </div>
                    </div>
                    <div id={id} className="btn-add-track" onClick={addTracktoPlaylist.bind(this)}><p className="text-btn-add">Add to playlist</p></div>
                </div>
            </li>
        )
    })
    return (
        <div className="add-tracks-container">
            <h2 className="add-tracks-header-container">
                Looking for more tracks? Add some of your own.
            </h2>
            <div className="container-tracks-add-to-playlist">
                <ul className="tracks-add-to-playlist">
                    {addTracksList}
                </ul>
            </div>
        </div>
    )
}