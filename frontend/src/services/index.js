import authService from './authService';
import eventService from './eventService';
import userService from './userService';
import api from './api';

export {
  authService,
  eventService,
  userService,
  api,
};

export default {
  auth: authService,
  events: eventService,
  users: userService,
};
