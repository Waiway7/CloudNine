import React from 'react';
import { Link } from 'react-router-dom';
import SessionModalContainer from '../navbar/nav_bar_container'

export default ({ currentUser, logout, signup, login }) => {
    // const display = currentUser ? (
    //     <div>
    //         <h3>{currentUser.username}!</h3>
    //         <button onClick={logout}>Logout</button>
    //     </div>
    //     ) : (
    return (
        <div className="session-form-btn">
            <button className='login-btn' onClick={() => login()}>Sign in</button>
            <button className='signup-btn' onClick={() => signup()}>Create account</button>
        </div>
        );
    // return (
    //     <header className="nav-bar">
    //         {display} 
    //     </header>
    // )
}

