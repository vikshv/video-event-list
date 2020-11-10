import { createSlice } from '@reduxjs/toolkit';
import { loadEvents } from 'app/actions/eventsActions';

import type { AnalyticEventState } from 'core/domains/RootState';

const initialState: AnalyticEventState = {
    events: null,
    progress: false
};

const { reducer } = createSlice({
    name: 'events',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadEvents.pending, (state) => {
                state.progress = true;
            })
            .addCase(loadEvents.fulfilled, (state, action) => {
                state.progress = false;
                state.events = action.payload;
            })
            .addCase(loadEvents.rejected, (state) => {
                state.progress = false;
            });
    }
});

export default reducer;