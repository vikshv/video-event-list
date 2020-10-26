import type AnalyticEventState from './AnalyticEventState';

interface RootState {
    readonly events: AnalyticEventState;
}

export type {
    AnalyticEventState
};

export default RootState; 