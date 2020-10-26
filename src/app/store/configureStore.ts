///<reference types="webpack-env" />

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducers from 'app/reducers';

import type { Store } from 'redux';

function configureStore(initialState?: unknown): Store {
    const rootReducer = combineReducers(reducers);
    const middleware = applyMiddleware(thunk);
    const store = createStore(rootReducer, initialState, composeWithDevTools(middleware));

    if (module.hot && process.env.NODE_ENV !== 'production') {
        module.hot.accept('app/reducers', () => {
            store.replaceReducer(rootReducer);
        });
    }

    return store;
}

export default configureStore;
