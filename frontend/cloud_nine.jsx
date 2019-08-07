import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from "./components/root";
import {fetchUserTracks} from "./actions/track_actions"

document.addEventListener("DOMContentLoaded", () => {
    let store;
    const root = document.getElementById('root');
    if (window.currentUser) {
        const preloadedState = {
            session: {
                id: window.currentUser
            }
        }
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }

    //test. load. debug. sadness.
    window.fetchUserTracks = fetchUserTracks
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    //testing...

    ReactDOM.render(<Root store={store}/>, root);
});