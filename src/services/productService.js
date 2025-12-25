import { httpClient } from '../config/axios';

/**
 * Product API Service
 * Handles all product-related API calls
 */

export const productService = {
  /**
   * Get all products
   */
  getAllProducts: async () => {
    const response = await httpClient.get('/allproducts');
    return response.data;
  },

  /**
   * Get product by ID
   */
  getProductById: async (id) => {
    const response = await httpClient.get(`/product/${id}`);
    return response.data;
  },

  /**
   * Get products by category
   */
  getProductsByCategory: async (categorySlug, gender) => {
    const response = await httpClient.get('/allproducts', {
      params: { category: categorySlug, gender }
    });
    return response.data;
  },
};

export default productService;
