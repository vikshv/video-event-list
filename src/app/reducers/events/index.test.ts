import { expect } from 'chai';

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

import reducer from './index';

import type { AnalyticEvent } from 'core/domains/RootState/AnalyticEventState';
import type AnalyticEventState from 'core/domains/RootState/AnalyticEventState';

describe('Events reducer', function() {
    it(`Action ${EVENTS_REQUEST}`, function() {
        const state: AnalyticEventState = {
            events: null,
            progress: false
        };

        const action: LoadEventsRequestAction = {
            type: EVENTS_REQUEST
        };

        const result = reducer(state, action);

        expect(result).to.be.deep.equal({
            ...state,
            progress: true
        });
    });

    it(`Action ${EVENTS_SUCCESS}`, function() {
        const events: AnalyticEvent[] = [];

        const state: AnalyticEventState = {
            events: null,
            progress: false
        };

        const action: LoadEventsSuccessAction = {
            type: EVENTS_SUCCESS,
            payload: {
                events
            }
        };

        const result = reducer(state, action);

        expect(result).to.be.deep.equal({
            ...state,
            progress: false,
            events
        });
    });

    it(`Action ${EVENTS_ERROR}`, function() {
        const state: AnalyticEventState = {
            events: null,
            progress: true
        };

        const action: LoadEventsErrorAction = {
            type: EVENTS_ERROR,
            error: new Error()
        };

        const result = reducer(state, action);

        expect(result).to.be.deep.equal({
            ...state,
            progress: false
        });
    });
});