import { httpClient } from "../config/axios";

export const orderService = {
  // ✅ Không cần thêm header thủ công, axios interceptor sẽ tự động thêm token
  getOrderUser: async (activeTab) => {
    const res = await httpClient.get(`/orders?status=${activeTab}`);
    return res.data;
  },
  
  getOrderById: async (orderId) => {
    const res = await httpClient.get(`/order/${orderId}`);
    return res.data;
  },
};
