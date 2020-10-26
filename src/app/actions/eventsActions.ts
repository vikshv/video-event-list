import analyticEventService from 'app/services/analyticEventService';

import type { Action } from 'redux';
import type { ThunkAction } from 'redux-thunk';

import type RootState from 'core/domains/RootState';
import type { AnalyticEvent } from 'core/domains/RootState/AnalyticEventState';

type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const EVENTS_REQUEST = 'EVENTS_REQUEST';
export const EVENTS_SUCCESS = 'EVENTS_SUCCESS';
export const EVENTS_ERROR = 'EVENTS_ERROR';

export type LoadEventsRequestAction = Action<typeof EVENTS_REQUEST>;
export type LoadEventsSuccessAction = Action<typeof EVENTS_SUCCESS> & {
    payload: {
        readonly events: AnalyticEvent[];
    }
};
export type LoadEventsErrorAction = Action<typeof EVENTS_ERROR> & {
    error: Error;
};

export function loadEvents(): AppThunkAction<void> {
    return async (dispatch): Promise<void> => {
        dispatch<LoadEventsRequestAction>({
            type: EVENTS_REQUEST
        });

        try {
            const events: AnalyticEvent[] = await analyticEventService.loadEvents();
            dispatch<LoadEventsSuccessAction>({
                type: EVENTS_SUCCESS,
                payload: {
                    events
                }
            });
        } catch (error) {
            dispatch<LoadEventsErrorAction>({
                type: EVENTS_ERROR,
                error: error as Error
            });
        }
    };
}