import React from 'react';
import {Route} from 'react-router-dom';
import LoginContainer from '../components/form/login_container';

const App = () => {
    return (
        <div>
            <Route path='/login' component={LoginContainer} />
        </div>
    )    
}

export default App;
