import api from './api';

const userService = {
  // Get user profile
  getUserProfile: async (username) => {
    try {
      const response = await api.get(`/user/profile/${username}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: 'Failed to fetch profile' };
    }
  },

  // Update user profile
  updateProfile: async (username, profileData) => {
    try {
      const response = await api.put(`/user/profile/${username}`, profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: 'Failed to update profile' };
    }
  },

  // Upload avatar
  uploadAvatar: async (formData) => {
    try {
      const response = await api.post('/user/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: 'Failed to upload avatar' };
    }
  },

  // Get user statistics
  getUserStats: async (username) => {
    try {
      const response = await api.get(`/user/stats/${username}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: 'Failed to fetch stats' };
    }
  },

  // Get user achievements
  getUserAchievements: async (username) => {
    try {
      const response = await api.get(`/user/achievements/${username}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: 'Failed to fetch achievements' };
    }
  },

  // Get leaderboard
  getLeaderboard: async (period = 'monthly') => {
    try {
      const response = await api.get(`/user/leaderboard?period=${period}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { msg: 'Failed to fetch leaderboard' };
    }
  },
};

export default userService;
