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
                        <h2 className="frontHero-title">Discover music that's so free! LITERALLY!!!</h2>
                        <p className="frontHero-description">Enjoy our free Royalty music. Here you don't need to be afraid of copyright infringement!</p>
                    </div>
                </div>
            </div>
        )
    
}



