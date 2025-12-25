import { httpClient } from "../config/axios";

export const chatService = {
  async sendMessage(message) {
    const res = await httpClient.post("/chatbot", { question: message });
    return res.data;
  },
};
