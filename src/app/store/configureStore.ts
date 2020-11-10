///<reference types="webpack-env" />

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import reducer from 'app/reducers';

import type { Store } from 'redux';
import type RootState from 'core/domains/RootState';

interface MiddlewareOptions {
    thunk?: boolean;
    immutableCheck?: boolean;
    serializableCheck?: boolean;
}

const middleware = getDefaultMiddleware<RootState, MiddlewareOptions>({
    thunk: true,
    immutableCheck: false,
    serializableCheck: false
});

export default function(): Store {
    return configureStore({
        reducer,
        middleware,
        devTools: process.env.NODE_ENV !== 'production'
    });
}
