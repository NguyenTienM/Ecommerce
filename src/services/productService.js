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
    const response = await httpClient.get('/products');
    return response.data;
  },

  /**
   * Get product by ID
   */
  getProductById: async (id) => {
    const response = await httpClient.get(`/products/${id}`);
    return response.data;
  },

  /**
   * Get new collections
   */
  getNewCollections: async () => {
    const response = await httpClient.get('/products/new-collections');
    return response.data;
  },

  /**
   * Get popular women products
   */
  getPopularWomen: async () => {
    const response = await httpClient.get('/products/popular-women');
    return response.data;
  },

  /**
   * Get products by category
   */
  getProductsByCategory: async (categorySlug, gender) => {
    const response = await httpClient.get('/products', {
      params: { category: categorySlug, gender }
    });
    return response.data;
  },
};

export default productService;
