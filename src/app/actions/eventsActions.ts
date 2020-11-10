import { createAsyncThunk } from '@reduxjs/toolkit';
import analyticEventService from 'app/services/analyticEventService';

import type { AnalyticEvent } from 'core/domains/RootState/AnalyticEventState';

export const loadEvents = createAsyncThunk('events/fetch', async (): Promise<AnalyticEvent[]> => {
    const events: AnalyticEvent[] = await analyticEventService.loadEvents();
    return events;
});
