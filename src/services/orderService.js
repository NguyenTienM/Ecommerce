import { httpClient } from "../config/axios";
export const orderService = {
  getOrderUser: async (activeTab) => {
    const token = localStorage.getItem("auth-token");
    const res = await httpClient.get(`/orders?status=${activeTab}`, {
      headers: { "auth-token": token },
    });
    return res.data;
  },
  getOrderById: async (orderId) => {
    const token = localStorage.getItem("auth-token");
    const res = await httpClient.get(`/order/${orderId}`, {
      headers: { "auth-token": token },
    });
    return res.data;
  },
};
