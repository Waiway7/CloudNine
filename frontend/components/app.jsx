import React from 'react';
import {Route, Switch} from 'react-router-dom';
import FrontHero from './splash/banner'
import NavBarContainer from '../components/navbar/nav_bar_container';
import SessionModal from '../components/form/session_modal_container';
import { AuthRoute, ProtectedRoute } from '../util/route_util'
import TestModel from './test_container'

const App = () => {
    return (
        <div>
            <SessionModal />
           
            <Switch>
                <AuthRoute exact path='/' component={FrontHero}/>
                <ProtectedRoute path="/discover" component={TestModel}/>
            </Switch>
        </div>
    )    
}

export default App;
