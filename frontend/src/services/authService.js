import api from './api';

const authService = {
  // User login
  login: async (username, password) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      localStorage.setItem('username', response.data.username);
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: 'Login failed' };
    }
  },

  // User registration
  register: async (username, password) => {
    try {
      const response = await api.post('/auth/register', { username, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: 'Registration failed' };
    }
  },

  // Admin login
  adminLogin: async (username, password) => {
    try {
      const response = await api.post('/auth/admin-login', { username, password });
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      localStorage.setItem('role', 'admin');
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: 'Admin login failed' };
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  },

  // Get current user
  getCurrentUser: () => {
    return localStorage.getItem('username');
  },
};

export default authService;
