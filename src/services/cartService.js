import { httpClient } from "../config/axios";

export const cartService = {
  getAllProducts: async () => {
    const res = await httpClient.get("/products");
    return res.data;
  },
  
  addToCart: async (product) => {
    await httpClient.post("/cart/items", product);
  },

  getCart: async () => {
    const response = await httpClient.get("/cart");
    return response.data;
  },
  
  removeFormCart: async (itemId) => {
    await httpClient.delete("/cart/items", { data: { itemId } });
  },
  
  clearCart: async () => {
    await httpClient.delete("/cart");
  },
  
  updateCartQuantity: async (itemId, quantity) => {
    await httpClient.put("/cart/items", { itemId, quantity });
  },
};
