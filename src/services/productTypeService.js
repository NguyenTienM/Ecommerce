import { httpClient } from '../config/axios';

/**
 * ProductType API Service
 * Handles all product type-related API calls
 */

export const productTypeService = {
  /**
   * Get product types by category and gender
   */
  getProductTypes: async (categorySlug, gender) => {
    const response = await httpClient.get('/api/product-types', {
      params: { categorySlug, gender }
    });
    return response.data;
  },

  /**
   * Get product type by ID
   */
  getProductTypeById: async (id) => {
    const response = await httpClient.get(`/api/product-types/${id}`);
    return response.data;
  },
};

export default productTypeService;
