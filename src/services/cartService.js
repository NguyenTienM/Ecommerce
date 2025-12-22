import { httpClient } from "../config/axios";
export const cartService = {
  getAllProducts: async () => {
    const res = await httpClient.get("/allproducts");
    return res.data;
  },
  addToCart: async (product) => {
    await httpClient.post("/addtocart", product, {
      headers: { "auth-token": localStorage.getItem("auth-token") },
    });
  },

  getCart: async () => {
    const response = await httpClient.post(
      "/getcart",
      {},
      { headers: { "auth-token": localStorage.getItem("auth-token") } }
    );
    return response.data;
  },
  removeFormCart: async (itemId) => {
    await httpClient.post(
      "/removefromcart",
      { itemId },
      { headers: { "auth-token": localStorage.getItem("auth-token") } }
    );
  },
  clearCart: async () => {
    await httpClient.post(
      "/clearcart",
      {},
      { headers: { "auth-token": localStorage.getItem("auth-token") } }
    );
  },
  
  updateCartQuantity: async (itemId, quantity) => {
    await httpClient.post(
      "/updatecart",
      { itemId, quantity },
      { headers: { "auth-token": localStorage.getItem("auth-token") } }
    );
  },
};
