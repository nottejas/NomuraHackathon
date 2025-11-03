import api from './api';

const eventService = {
  // Get all events
  getAllEvents: async () => {
    try {
      const response = await api.get('/event');
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: 'Failed to fetch events' };
    }
  },

  // Get event by ID
  getEventById: async (eventId) => {
    try {
      const response = await api.get(`/event/${eventId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: 'Failed to fetch event' };
    }
  },

  // Create event (admin)
  createEvent: async (eventData) => {
    try {
      const response = await api.post('/event/create', eventData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: 'Failed to create event' };
    }
  },

  // Update event (admin)
  updateEvent: async (eventId, eventData) => {
    try {
      const response = await api.put(`/event/${eventId}`, eventData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: 'Failed to update event' };
    }
  },

  // Delete event (admin)
  deleteEvent: async (eventId) => {
    try {
      const response = await api.delete(`/event/${eventId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: 'Failed to delete event' };
    }
  },

  // Enroll in event
  enrollInEvent: async (eventId, username) => {
    try {
      const response = await api.post(`/event/enroll/${eventId}`, { username });
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: 'Failed to enroll in event' };
    }
  },

  // Get user's enrolled events
  getUserEvents: async (username) => {
    try {
      const response = await api.get(`/event/user/${username}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: 'Failed to fetch user events' };
    }
  },

  // Search events with filters
  searchEvents: async (filters) => {
    try {
      const response = await api.post('/event/search', filters);
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: 'Failed to search events' };
    }
  },
};

export default eventService;
