import { httpClient } from '../config/axios';

/**
 * ProductType API Service
 * Handles all product type-related API calls
 */

export const productTypeService = {
  /**
   * Get all product types
   */
  getAllProductTypes: async () => {
    const response = await httpClient.get('/product-types');
    return response.data;
  },

  /**
   * Get product types by category and gender
   */
  getProductTypes: async (categorySlug, gender) => {
    const response = await httpClient.get('/product-types', {
      params: { categorySlug, gender }
    });
    return response.data;
  },

  /**
   * Get product type by ID
   */
  getProductTypeById: async (id) => {
    const response = await httpClient.get(`/product-types/${id}`);
    return response.data;
  },
};

export default productTypeService;
