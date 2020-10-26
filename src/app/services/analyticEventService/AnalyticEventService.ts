
import type { AnalyticEvent } from 'core/domains/RootState/AnalyticEventState';

interface NetworkService {
    get<Data>(url: string): Promise<Data>;
}

interface Dependencies {
    readonly networkService: NetworkService;
}

export default class AnalyticEventService {
    private readonly networkService: NetworkService;

    constructor({ networkService }: Dependencies) {
        this.networkService = networkService;
    }

    async loadEvents(): Promise<AnalyticEvent[]> {
        const url = 'http://www.mocky.io/v2/5e60c5f53300005fcc97bbdd';
        const events = await this.networkService.get<AnalyticEvent[]>(url);
        return events.sort((a: AnalyticEvent, b: AnalyticEvent) => {
            let result;
            if (b.timestamp < a.timestamp) {
                result = 1;
            } else if (a.timestamp < b.timestamp) {
                result = -1;
            } else {
                result = 0;
            }
            return result;
        });
    }
}