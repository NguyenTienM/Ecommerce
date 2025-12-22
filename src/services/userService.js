import { httpClient } from "../config/axios";

export const userService = {
  login: async (formData) => {
    const response = await httpClient.post("/login", formData);
    if (response.data.success) {
      // ✅ Chỉ lưu role vào localStorage
      localStorage.setItem("user-role", response.data.user.role);
      // Refresh token tự động lưu vào cookie bởi browser
      return response.data; // ✅ Return để AuthContext xử lý
    } else {
      throw new Error(response.data.errors || "Login failed");
    }
  },

  signup: async (formData) => {
    const response = await httpClient.post("/signup", formData);
    if (response.data.success) {
      // ✅ Chỉ lưu role vào localStorage
      localStorage.setItem("user-role", response.data.user.role);
      // Refresh token tự động lưu vào cookie
      return response.data; // ✅ Return để AuthContext xử lý
    } else {
      throw new Error(response.data.errors || "Signup failed");
    }
  },

  getMe: async (token) => {
    const response = await httpClient.get("/me", {
      headers: { "auth-token": token },
    });
    return response.data;
  },

  refreshToken: async () => {
    // ✅ Không cần gửi refresh token, cookie tự động gửi
    const response = await httpClient.post("/refresh");
    
    if (response.data.success) {
      // Access token sẽ được lưu vào memory bởi AuthContext
      return response.data.accessToken;
    }
    throw new Error("Failed to refresh token");
  },

  logout: async () => {
    // ✅ Không cần gửi refresh token, cookie tự động gửi
    await httpClient.post("/logout");
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user-role");
  },
};
