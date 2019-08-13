import React from 'react';
import NavBarContainer from '../navbar/nav_bar_container';
import { connect } from 'react-redux';

export default () => {
        return (
            <div className="splash">
                <div className="frontHeroContainer">
                    <div className="frontHero">
                        <div className="logo">
                            <img className="logo-background" src="https://cloudnine-upload-dev.s3.amazonaws.com/5d51df08e88bf.png"/>
                            <div className="logo-text">CLOUDNINE</div>
                        </div>
                        <NavBarContainer />
                        <div className="frontHero-content">
                            <h2 className="frontHero-title">Discover music that's so free! LITERALLY!!!</h2>
                            <p className="frontHero-description">Enjoy our free Royalty music. Here you don't need to be afraid of copyright infringement!</p>
                        </div>
                    </div>
                </div>
                <div className="upload-search-container">
                    <input className="search-splash" type="text" placeholder="Search.."/>
                    <button className="upload-splash">Upload your own</button>
                </div>
            </div>
        )
    
}



