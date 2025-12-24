import { httpClient } from "../config/axios";

export const addressService = {
  // Get all addresses for current user
  getAddresses: async () => {
    const response = await httpClient.get("/getAdress");
    return response.data;
  },

  // Add new address
  addAddress: async (addressData) => {
    const response = await httpClient.post("/address", addressData);
    return response.data;
  },

  // Update existing address
  updateAddress: async (id, addressData) => {
    const response = await httpClient.put(`/address/${id}`, addressData);
    return response.data;
  },

  // Delete address
  deleteAddress: async (id) => {
    const response = await httpClient.delete(`/address/${id}`);
    return response.data;
  },

  // Set address as default
  setDefaultAddress: async (id) => {
    const response = await httpClient.put(`/address/${id}/default`);
    return response.data;
  },
};
