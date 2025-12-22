import { httpClient } from "../config/axios";

export const paymentService = {
  codPayment: async (payload) => {
    const token = localStorage.getItem("auth-token");
    const res = await httpClient.post("/cod-payment", payload, {
      headers: { "auth-token": token },
    });
    return res.data;
  },

  // 💳 Thanh toán qua MoMo
  momoPayment: async (payload) => {
    const token = localStorage.getItem("auth-token");
    const orderInfo = `Thanh toán đơn hàng ${Date.now()}`;
    const res = await httpClient.post(
      "/momo-payment",
      { ...payload, orderInfo },
      {
        headers: { "auth-token": token },
      }
    );
    return res.data;
  },
};
