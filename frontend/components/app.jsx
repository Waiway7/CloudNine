import React from 'react';
import {Route, Switch} from 'react-router-dom';
import FrontHero from './splash/banner'
import NavBarContainer from '../components/navbar/nav_bar_container';
import SessionModal from '../components/form/session_modal_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util'
import MainNavBar from './main_nav_bar/nav_bar'
import UploadTrack from './upload/upload_track'
import YouTracks from './current_user_tracks/tracks'
import MusicPlayer from './current_user_tracks/play_test'

const App = () => {
    return (
        <div className="app">
            <header>
                <Route path='/:subpath' component={MainNavBar} />
            </header>
           
            <SessionModal />

            <Switch>
                <AuthRoute exact path='/' component={FrontHero}/>
                <ProtectedRoute exact path='/upload' component={UploadTrack}/>
                <ProtectedRoute exact path='/you/library' component={YouTracks}/>
            </Switch>

            <footer><MusicPlayer /></footer>
        </div>
    )    
}

export default App;
