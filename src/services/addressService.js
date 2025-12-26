import { httpClient } from "../config/axios";

export const addressService = {
  // Get all addresses for current user
  getAddresses: async () => {
    const response = await httpClient.get("/addresses");
    return response.data;
  },

  // Add new address
  addAddress: async (addressData) => {
    const response = await httpClient.post("/addresses", addressData);
    return response.data;
  },

  // Update existing address
  updateAddress: async (id, addressData) => {
    const response = await httpClient.put(`/addresses/${id}`, addressData);
    return response.data;
  },

  // Delete address
  deleteAddress: async (id) => {
    const response = await httpClient.delete(`/addresses/${id}`);
    return response.data;
  },

  // Set address as default
  setDefaultAddress: async (id) => {
    const response = await httpClient.patch(`/addresses/${id}/default`);
    return response.data;
  },
};
