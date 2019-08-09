import React from 'react';
import {Link} from 'react-router-dom';

export default ({pathname}) => {
    let userNav;
    if (pathname === '/you/library') {
        userNav = 
        <div className="user-nav">
            <Link to="/upload" style={{ textDecoration: 'none' }}>
                <div  className="upload-tag">
                    Upload
                </div>
            </Link>
            <Link to="/you/library" style={{ textDecoration: 'none' }}>
                <div  className="selected-tracks-tag target">
                    Your Tracks
                </div>
            </Link>
        </div>
    } else if (pathname === '/upload') {
        userNav = 
        <div className="user-nav">
            <Link to="/upload" style={{ textDecoration: 'none' }}>
                <div  className="selected-upload-tag">
                    Upload
                </div>
            </Link>
            <Link to="/you/library" style={{ textDecoration: 'none' }}>
                <div className="tracks-tag target">
                    Your Tracks
                </div>
            </Link>
        </div>
    } else {
        <div className="user-nav">
        <Link to="/upload" style={{ textDecoration: 'none' }}>
            <div className="upload-tag">
                Upload
            </div>
        </Link>
        <Link to="/you/library" style={{ textDecoration: 'none' }}>
            <div className="tracks-tag target">
                Your Tracks
            </div>
        </Link>
    </div>
    }
    return (
        userNav
    )
}