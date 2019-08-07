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
    return (
        <div className="header">
            <div className="nav-bar">
                <div className="header-logo-left">
                    <Link to="/discover" style={{ textDecoration: 'none' }}>
                        <div className="background-logo">
                            <img className="soundcloud-logo" src="https://a-v2.sndcdn.com/assets/images/header/cloud-e365a47.png"/>
                            CLOUDNINE
                        </div>
                    </Link>
                    <Link to="/discover" style={{textDecoration: 'none'}}>
                        <div id="/discover" className="home-btn">
                            Home
                        </div>
                    </Link>
                    <Link to="/stream" style={{textDecoration: 'none'}}>
                        <div id="/stream" className="stream-btn">
                            Stream
                        </div>
                    </Link>
                    <Link to="/you/library" style={{textDecoration: 'none'}}>
                        <div id="/you/library" className="library-btn">
                            Library
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
                <button className="nav-dropdown"><p className="dot">...</p></button>
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