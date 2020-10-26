import type AnalyticEventState from 'core/domains/RootState/AnalyticEventState';

import {
    EVENTS_REQUEST,
    EVENTS_SUCCESS,
    EVENTS_ERROR
} from 'app/actions/eventsActions';

import {
    LoadEventsRequestAction,
    LoadEventsSuccessAction,
    LoadEventsErrorAction
} from 'app/actions/eventsActions';

type Action = LoadEventsRequestAction | LoadEventsSuccessAction | LoadEventsErrorAction;

interface Reducer<State, Action> {
    (state: Readonly<State>, action: Readonly<Action>): State;
}

const initialState: AnalyticEventState = {
    events: null,
    progress: false
};

const eventListRequest: Reducer<AnalyticEventState, LoadEventsRequestAction> = state => ({
    ...state,
    progress: true
});

const eventListSuccess: Reducer<AnalyticEventState, LoadEventsSuccessAction> = (state, action) => ({
    ...state,
    progress: false,
    events: action.payload.events
});

const eventListError: Reducer<AnalyticEventState, LoadEventsErrorAction> = state => ({
    ...state,
    progress: false
});

export default function(state: AnalyticEventState = initialState, action: Action): AnalyticEventState {
    let result;
    if (action.type === EVENTS_REQUEST) {
        result = eventListRequest(state, action);
    } else if (action.type === EVENTS_SUCCESS) {
        result = eventListSuccess(state, action);
    } else if (action.type === EVENTS_ERROR) {
        result = eventListError(state, action);
    } else {
        result = state;
    }
    return result;
}