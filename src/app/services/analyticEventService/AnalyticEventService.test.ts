import { expect } from 'chai';

import AnalyticEventService from './AnalyticEventService';
import fixture from './fixture.json';

describe('AnalyticEventService', function() {
    describe('loadEvents', function() {
        const analyticEventService = new AnalyticEventService({
            networkService: {
                get<Data>(url: string): Promise<Data> {
                    return Promise.resolve(fixture as unknown as Data);
                }
            }
        });

        it('should return data', async function() {
            const events = await analyticEventService.loadEvents();
            expect(events).to.be.deep.equal(fixture);
        });
    });
});