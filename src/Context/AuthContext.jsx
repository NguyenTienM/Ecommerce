import { createContext, useState, useEffect } from "react";
import { userService } from "../services/userService";
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null); // ✅ Lưu trong memory

  const login = async (formData) => {
    try {
      const response = await userService.login(formData);
      if (response.success) {
        setAccessToken(response.accessToken); // ✅ Lưu vào state
        setUser(response.user);
        toast.success("Đăng nhập thành công!");
        window.location.replace("/");
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    }
  };
  
  const signup = async (formData) => {
    try {
      const response = await userService.signup(formData);
      if (response.success) {
        setAccessToken(response.accessToken); // ✅ Lưu vào state
        setUser(response.user);
        toast.success("Đăng ký thành công!");
        window.location.replace("/");
      }
    } catch (error) {
      toast.error("Đăng ký thất bại. Vui lòng thử lại.");
    }
  };
  
  const logout = async () => {
    try {
      await userService.logout();
      setUser(null);
      setAccessToken(null); // ✅ Xóa khỏi memory
      toast.info("Đã đăng xuất");
      window.location.replace("/");
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.clear();
      setUser(null);
      setAccessToken(null);
      window.location.replace("/");
    }
  };
  
  const fetchUser = async () => {
    try {
      // ✅ Sử dụng token từ state
      if (accessToken) {
        const me = await userService.getMe(accessToken);
        setUser(me);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Auto-refresh khi page load
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Gọi refresh để lấy access token mới từ cookie
        const newAccessToken = await userService.refreshToken();
        setAccessToken(newAccessToken);
        
        // Fetch user info với token mới
        const me = await userService.getMe(newAccessToken);
        setUser(me);
        setLoading(false);
      } catch (error) {
        // Không có refresh token hoặc hết hạn
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Helper function để check admin
  const isAdmin = () => {
    return user?.role === "admin";
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      signup, 
      logout, 
      isAdmin,
      accessToken, // ✅ Export token để axios dùng
      setAccessToken // ✅ Export để update khi refresh
    }}>
      {children}
    </AuthContext.Provider>
  );
};
