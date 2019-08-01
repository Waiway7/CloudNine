import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from "./components/root";

document.addEventListener("DOMContentLoaded", () => {
    let store;
    const root = document.getElementById('root');
    if (window.currentUser) {
        const preloadedState = {
            session: {
                [window.currentUser.id]: window.currentUser
            }
        }
        store = configureStore(preloadedState);
    } else {
        store = configureStore();
    }

    //test. load. debug. sadness.
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    //testing...

    ReactDOM.render(<Root store={store}/>, root);
});