import React from 'react';
import NavBarContainer from '../navbar/nav_bar_container';
import { connect } from 'react-redux';

export default () => {
        return (
            <div className="frontHeroContainer">
                <div className="frontHero">
                    <div className="logo">CLOUDNINE</div>
                    <NavBarContainer />
                    <div className="frontHero-content">
                        <h2 className="frontHero-title">Discover more with CloudNine+</h2>
                        <p className="frontHero-description">Cloudnine is an euphoric once in a lifetime experience. A journey that's everlasting!</p>
                    </div>
                </div>
            </div>
        )
    
}



