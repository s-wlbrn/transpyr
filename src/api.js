import myAxios from './auth/axios.config';
import { calculateEventInfo } from './libs/calculateEventInfo';

class API {
  constructor(token) {
    this.token = token;
    this.host = 'http://localhost:3000/api';
  }
  //GET multiple
  async getAll(url, query) {
    const response = await myAxios(this.token).get(
      `${this.host}${url}${typeof query === 'string' ? `?${query}` : ''}`,
      {
        params: typeof query === 'object' ? query : undefined,
      }
    );
    return response;
  }

  //Upload photo
  uploadPhoto = async (resource, id, formData) => {
    await myAxios(this.token).patch(
      `http://localhost:3000/api/${resource}/${id}`,
      formData
    );
  };

  //EVENTS
  //query events
  getEvents = async (options = {}) => {
    const response = await this.getAll('/events', options.query);

    if (options.calculateEventInfo) {
      response.data.data = response.data.data.map((event) =>
        calculateEventInfo(event)
      );
    }
    return response.data;
  };

  //get one event
  getEvent = async (id, options = {}) => {
    const response = await myAxios(this.token).get(`${this.host}/events/${id}`);

    if (options.calculateEventInfo) {
      response.data.data = calculateEventInfo(response.data.data);
    }
    return response.data.data;
  };

  //get own events
  getMyEvents = async (options = {}) => {
    const response = await this.getAll('/events/me/managed', options.query);
    return response.data.data;
  };

  //get events with active bookings
  getBookedEvents = async (options = {}) => {
    const response = await this.getAll('/events/me/booked', options.query);
    return response.data.data;
  };

  //create event
  createEvent = async (event) => {
    const response = await myAxios(this.token).post(
      `${this.host}/events`,
      event
    );
    return response.data.data;
  };

  //edit event
  editEvent = async (eventId, event) => {
    await myAxios(this.token).put(
      `http://localhost:3000/api/events/${eventId}`,
      event
    );
  };

  //publish event
  publishEvent = async (id, data) => {
    await myAxios(this.token).put(
      `${this.host}/events/${id}/publish-event`,
      data
    );
  };

  //cancel event ticket
  cancelTicket = async (eventId, ticketId) => {
    await myAxios(this.token).delete(
      `${this.host}/events/${eventId}/ticket/${ticketId}`
    );
  };

  //cancel event
  cancelEvent = async (id) => {
    await myAxios(this.token).delete(`${this.host}/events/${id}/`);
  };

  //BOOKINGS
  //create checkout session
  createCheckoutSession = async (eventId, booking) => {
    const session = await myAxios().post(
      `http://localhost:3000/api/bookings/checkout-session/${eventId}`,
      booking
    );
    return session;
  };

  //TEMPORARY: create bookings
  createBookings = async (search) => {
    await myAxios().get(
      `${this.host}/bookings/checkout-create-booking${search}}`
    );
  };

  //get own bookings
  getMyBookings = async (options = {}) => {
    const response = await this.getAll('/bookings/me', options.query);
    return response.data;
  };

  //get event refund requests
  getEventRefundRequests = async (id) => {
    const response = await myAxios(this.token).get(
      `${this.host}/bookings/refund-requests/event/${id}`
    );
    return response.data;
  };

  //get refund request by request ID
  getRefundRequest = async (id) => {
    const response = await myAxios(this.token).get(
      `${this.host}/bookings/refund-requests/${id}`
    );
    return response.data;
  };

  //request refund
  requestRefund = async (eventId, data) => {
    await myAxios(this.token).patch(
      `${this.host}/bookings/refund-requests/event/${eventId}`,
      data
    );
  };

  //resolve refund request
  resolveRefundRequest = async (id, status) => {
    await myAxios(this.token).patch(
      `${this.host}/bookings/refund-request/${id}?status=${status}`
    );
  };

  //USERS
  //edit profile
  updateUser = async (data) => {
    const response = await myAxios(this.token).patch(
      `${this.host}/users/me`,
      data
    );
    return response.data;
  };

  //get user profile
  getUserProfile = async (id, options = {}) => {
    const response = await this.getAll(`/users/profile/${id}`, options.query);
    return response.data.user;
  };

  //forgot password
  forgotPassword = async (email) => {
    await myAxios().post(`${this.host}/users/forgot-password`, {
      email,
    });
  };

  //reset password
  resetPassword = async (resetToken, password, passwordConfirm) => {
    await myAxios().patch(`${this.host}/users/reset-password/${resetToken}`, {
      password,
      passwordConfirm,
    });
  };
}

export default API;
