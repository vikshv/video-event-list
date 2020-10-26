import axios from 'axios';
import AnalyticEventService from './AnalyticEventService';

export default new AnalyticEventService({
    networkService: {
        async get<Data>(url: string): Promise<Data> {
            const result = await axios.get(url);
            return result.data as Data;
        }
    }
});