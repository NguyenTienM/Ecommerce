import { httpClient } from "../config/axios";
export const productService = {
  getNewCollections: async () => {
    const response = await httpClient.get("/newcollections");
    return response.data;
  },
  getPopularWomen: async () => {
    const response = await httpClient.get("/popularwomen");
    return response.data;
  },
};
