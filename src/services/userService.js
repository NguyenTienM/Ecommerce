import { httpClient } from '../config/axios';

/**
 * User API Service
 * Handles all user-related API calls
 */

export const userService = {
  /**
   * Login
   */
  login: async (credentials) => {
    const response = await httpClient.post('/login', credentials);
    return response.data;
  },

  /**
   * Signup
   */
  signup: async (userData) => {
    const response = await httpClient.post('/signup', userData);
    return response.data;
  },

  /**
   * Logout
   */
  logout: async () => {
    const response = await httpClient.post('/logout');
    return response.data;
  },

  /**
   * Refresh access token
   */
  refreshToken: async () => {
    const response = await httpClient.post('/refresh');
    return response.data.accessToken;
  },

  /**
   * Get current user info
   */
  getMe: async () => {
    const response = await httpClient.get('/me');
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await httpClient.get('/me');
    return response.data;
  },

  /**
   * Update user profile
   */
  updateProfile: async (data) => {
    const response = await httpClient.put('/profile', data);
    return response.data;
  },

  /**
   * Upload avatar
   */
  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    
    const response = await httpClient.put('/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  /**
   * Change password
   */
  changePassword: async (currentPassword, newPassword) => {
    const response = await httpClient.put('/password', {
      currentPassword,
      newPassword
    });
    return response.data;
  },
};

export default userService;
