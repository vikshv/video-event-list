import expect from 'expect';

import { loadEvents } from 'app/actions/eventsActions';
import reducer from './index';

import type { AnalyticEvent } from 'core/domains/RootState/AnalyticEventState';
import type AnalyticEventState from 'core/domains/RootState/AnalyticEventState';

describe('Events reducer', () => {
    test(`Action ${loadEvents.pending}`, () => {
        const state: AnalyticEventState = {
            events: null,
            progress: false
        };

        const result = reducer(state, loadEvents.pending);

        expect(result).toEqual({
            ...state,
            progress: true
        })
    });

    test(`Action ${loadEvents.fulfilled}`, function() {
        const state: AnalyticEventState = {
            events: null,
            progress: true
        };

        const result = reducer(state, {
            type: loadEvents.fulfilled.toString(),
            payload: []
        });

        expect(result).toEqual({
            ...state,
            progress: false,
            events: []
        });
    });

    test(`Action ${loadEvents.rejected}`, function() {
        const state: AnalyticEventState = {
            events: null,
            progress: true
        };

        const result = reducer(state, loadEvents.rejected);

        expect(result).toEqual({
            ...state,
            progress: false
        })
    });
});
