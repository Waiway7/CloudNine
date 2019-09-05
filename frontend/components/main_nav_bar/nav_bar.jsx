import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { logout } from '../../actions/session_actions';
import {openModal} from '../../actions/modal_actions';

const navBar = ({currentUser, logout, signup, login}) => {
    
    const display = currentUser ? (
        <button className="logout-btn" onClick={() => logout()}>Logout</button> 
        ) : (
        <div className="nav-form-container">
            <button className='nav-login-btn' onClick={() => login()}>Sign in</button>
            <button className='nav-signup-btn' onClick={() => signup()}>Create account</button>
        </div>
        );
    const profileLink = currentUser ? `/profile/${currentUser.username}/${currentUser.id}/tracks` : "/"
    const playlist = currentUser ? `/profile/${currentUser.username}/${currentUser.id}/playlists` : "/"
    const targetPlaylist = location.href.includes("playlists") ? "stream-btn-target" : "stream-btn";
    const targetTracks = location.href.includes("profile") && location.href.includes("tracks") ? "home-btn-target" : "home-btn"

    return (
        <div className="header">
            <div className="nav-bar">
                <div className="header-logo-left">
                    {/* <Link to="/discover" style={{ textDecoration: 'none' }}> */}
                        <div className="background-logo">
                            <img className="soundcloud-logo" src="https://a-v2.sndcdn.com/assets/images/header/cloud-e365a47.png"/>
                            CLOUDNINE
                        </div>
                    {/* </Link> */}
                    {/* <Link to="/discover" style={{textDecoration: 'none'}}>
                        <div id="/discover" className="home-btn">
                            <p className="home-text">Home</p>
                        </div>
                    </Link> */}
                    <Link to={profileLink} style={{textDecoration: 'none'}}>
                        <div className={targetTracks}>
                        <p className="home-text">Profile</p>
                        </div>
                    </Link>
                    <Link to={playlist} style={{textDecoration: 'none'}}>
                        <div id="" className={targetPlaylist}>
                        <p className="stream-text">Playlists</p>
                        </div>
                    </Link>
                    <Link to="/you/library" style={{textDecoration: 'none'}}>
                        <div id="/you/library" className="library-btn">
                            <p className="library-text">Library</p>
                        </div>
                    </Link>
                </div>
                <div className="search-bar">
                    <input className="search" type="text" placeholder="Search.."/>
                </div>
                <div className="right-menu-nav">
                    {display}
                </div>
                <Link to='/upload' style={{textDecoration: 'none'}}>
                        <div className="upload">Upload</div>
                </Link>
                <ul className="container-list-links">
                    <li className="links-to-projects">
                        <a textDecoration="none" target="_blank" href="https://github.com/Waiway7/CloudNine" className="target-link"><i className="fab fa-github github"></i></a>
                    </li>
                    <li className="links-to-projects">
                        <a textDecoration="none" target="_blank" href="https://angel.co/wai-c-chan" className="target-link"><i className="fab fa-angellist github"></i></a>
                    </li>
                    <li className="links-to-projects">
                        <a textDecoration="none" target="_blank" href="https://linkedin.com/in/wai-chun-chan-718035117/" className="target-link"><i className="fab fa-linkedin github"></i></a>
                    </li>
                    <li className="links-to-projects">
                        <a textDecoration="none" target="_blank" href="https://waiway7.github.io/AudioJS/" className="target-link"><i className="fas fa-headphones github   "></i></a>
                    </li>
                </ul>                                        
                </div>
        </div>
    )   
}

const mdp = dispatch => ({
    logout: () => dispatch(logout()),
    signup: () => dispatch(openModal('signup')),
    login: () => dispatch(openModal('login')),
})

const msp = (state) => ({
    currentUser: state.session.id,
    
   
});

export default connect(msp, mdp)(navBar);