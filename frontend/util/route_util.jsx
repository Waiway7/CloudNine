import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect, withRouter} from 'react-router-dom';

const Auth = ({ component: Component, path, loggedIn, exact }) => {
    return (
        <Route path={path} exact={exact} render={(props) => (
            loggedIn ? ( 
                <Redirect to='/you/library' />
            ) : (
                <Component {...props} />            )
        )} />
    )
}

//Protected will need to be changed later due to redirect needing to be something else
const Protected = ({ component: Component, path, loggedIn, exact }) => {
    return (
        <Route path={path} exact={exact} render={(props) => (
            loggedIn ? (
                <Component {...props} />
            ) : (
                <Redirect to="/" />
            )
        )}/>
    )
}

const msp = state => (
    {loggedIn: Boolean(state.session.id)}
);

export const AuthRoute = withRouter(connect(msp)(Auth));
export const ProtectedRoute = withRouter(connect(msp)(Protected));