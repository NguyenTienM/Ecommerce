import { httpClient } from "../config/axios";

export const paymentService = {
  codPayment: async (payload) => {
    const res = await httpClient.post("/cod-payment", payload);
    return res.data;
  },

  // 💳 Thanh toán qua MoMo
  momoPayment: async (payload) => {
    const orderInfo = `Thanh toán đơn hàng ${Date.now()}`;
    const res = await httpClient.post("/momo-payment", { ...payload, orderInfo });
    return res.data;
  },
};
