import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';

import 'normalize.css';
import 'core/styles/style.css';

import configureStore from './store/configureStore';
import AppReduxContainer from './containers/AppReduxContainer';

export default function start(): void {
    renderApp();
}

function renderApp() {
    const store = configureStore();
    const container = document.getElementById('root');

    const component = (
        <AppReduxContainer
            store={store}
        />
    );

    render(component, container);
}
