import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

export const BASE_URL = "http://localhost:4000";

export const httpClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // ✅ Gửi cookie với mọi request
});

// ✅ Biến global để lưu accessToken và setAccessToken từ context
let globalAccessToken = null;
let globalSetAccessToken = null;

// ✅ Function để set token từ AuthContext
export const setAxiosToken = (token, setToken) => {
  globalAccessToken = token;
  globalSetAccessToken = setToken;
};

// Request interceptor - tự động thêm access token vào header
httpClient.interceptors.request.use(
  (config) => {
    // ✅ Lấy token từ global variable (được set từ AuthContext)
    if (globalAccessToken) {
      config.headers["auth-token"] = globalAccessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - tự động refresh token khi 401
httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // ✅ Không cần gửi refresh token, cookie tự động gửi
        const response = await axios.post(
          `${BASE_URL}/refresh`,
          {},
          {
            withCredentials: true, // ✅ Gửi cookie
          }
        );

        if (response.data.success) {
          const newAccessToken = response.data.accessToken;
          
          // ✅ Update token trong AuthContext
          if (globalSetAccessToken) {
            globalSetAccessToken(newAccessToken);
          }
          globalAccessToken = newAccessToken;

          // Retry request ban đầu với token mới
          originalRequest.headers["auth-token"] = newAccessToken;
          return httpClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh token hết hạn hoặc invalid
        console.log("❌ Refresh token failed:", refreshError.message);
        
        globalAccessToken = null;
        
        // ✅ Chỉ redirect nếu KHÔNG phải đang ở login page
        if (!window.location.pathname.includes('/login')) {
          window.location.href = "/login";
        }
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
