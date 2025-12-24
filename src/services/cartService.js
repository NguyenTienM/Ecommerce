import { httpClient } from "../config/axios";
export const cartService = {
  getAllProducts: async () => {
    const res = await httpClient.get("/allproducts");
    return res.data;
  },
  addToCart: async (product) => {
    await httpClient.post("/addtocart", product);
  },

  getCart: async () => {
    const response = await httpClient.post("/getcart", {});
    return response.data;
  },
  removeFormCart: async (itemId) => {
    await httpClient.post("/removefromcart", { itemId });
  },
  clearCart: async () => {
    await httpClient.post("/clearcart", {});
  },
  
  updateCartQuantity: async (itemId, quantity) => {
    await httpClient.post("/updatecart", { itemId, quantity });
  },
};
