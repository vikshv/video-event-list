import React from 'react';
import { Provider } from 'react-redux';
import App from 'app/components/App';

import type { Store } from 'redux';

interface Props {
    readonly store: Store;
}

export default function AppReduxContainer(props: Props): React.ReactElement {
    return (
        <Provider store={props.store}>
            <App />
        </Provider>
    );
}