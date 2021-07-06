import myAxios from './auth/axios.config';
import { calculateEventInfo } from './libs/calculateEventInfo';

class API {
  host = 'http://localhost:3000/api';
  //query events
  async getEvents(query, options = {}) {
    const response = await myAxios().get(
      `${this.host}/events${typeof query === 'string' ? `?${query}` : ''}`,
      {
        params: typeof query === 'object' ? query : undefined,
      }
    );
    if (options.calculateEventInfo) {
      response.data.data = response.data.data.map((event) =>
        calculateEventInfo(event)
      );
    }
    return response.data;
  }

  //get one event
  async getEvent(id, options = {}) {
    const response = await myAxios().get(`${this.host}/events/${id}`);
    if (options.calculateEventInfo) {
      response.data.data = calculateEventInfo(response.data.data);
    }
    return response.data.data;
  }
}

export default API;
