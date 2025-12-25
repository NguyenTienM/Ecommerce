import { httpClient } from '../config/axios';

/**
 * Category API Service
 * Handles all category-related API calls
 */

export const categoryService = {
  /**
   * Get categories by gender
   */
  getCategoriesByGender: async (gender) => {
    const response = await httpClient.get('/categories', {
      params: { gender }
    });
    return response.data;
  },

  /**
   * Get all categories
   */
  getAllCategories: async () => {
    const response = await httpClient.get('/categories');
    return response.data;
  },
};

export default categoryService;
