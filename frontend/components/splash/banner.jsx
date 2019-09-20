import React from 'react';
import NavBarContainer from '../navbar/nav_bar_container';

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
                            <h2 className="frontHero-title">Discover more with CloudNine</h2>
                            <p className="frontHero-description">Upload your first track and begin your journey. </p>
                        </div>
                    </div>
                </div>
                <div className="upload-search-container">
                    <input className="search-splash" type="text" placeholder="Search for artists, bands, tracks, podcasts"/>
                    {/* <i class="fas fa-search"></i> */}
                    <p className="or">or</p>
                    <button className="upload-splash">Upload your own</button>
                </div>

                <div className="filler-block">
                    <p className="filler-text">Hear what's trending for free in the CloudNine Community</p>
                </div>
            </div>
        )
    
}



