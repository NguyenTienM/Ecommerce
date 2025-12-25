import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import "./LoginSignup.css";

export const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin, signup: authSignup } = useContext(AuthContext);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    if (!formData.email || !formData.password) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    setLoading(true);
    try {
      await authLogin(formData);
      // Navigation handled by AuthContext
    } catch (error) {
      toast.error(error.response?.data?.message || "Đăng nhập thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const signup = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (!agreedToTerms) {
      toast.error("Vui lòng đồng ý với điều khoản sử dụng!");
      return;
    }

    setLoading(true);
    try {
      await authSignup(formData);
      // Navigation handled by AuthContext
    } catch (error) {
      toast.error(error.response?.data?.message || "Đăng ký thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    toast.info(`Tính năng đăng nhập bằng ${provider} sẽ được tích hợp sau!`);
  };

  return (
    <div className="loginsignup-page">
      <div className="loginsignup-container">
        {/* Left Panel - Branding */}
        <div className="loginsignup-left">
          <div className="branding-content">
            <h1>Chào mừng đến với Uniqlo</h1>
            <p>Khám phá thời trang chất lượng cao với giá cả hợp lý</p>
            <div className="decoration-circles">
              <div className="circle circle-1"></div>
              <div className="circle circle-2"></div>
              <div className="circle circle-3"></div>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="loginsignup-right">
          <div className="form-container">
            {/* Tab Switcher */}
            <div className="tab-switcher">
              <button
                className={`tab ${state === "Login" ? "active" : ""}`}
                onClick={() => setState("Login")}
              >
                Đăng nhập
              </button>
              <button
                className={`tab ${state === "Sign Up" ? "active" : ""}`}
                onClick={() => setState("Sign Up")}
              >
                Đăng ký
              </button>
            </div>

            <h2 className="form-title">
              {state === "Login" ? "Chào mừng trở lại!" : "Tạo tài khoản mới"}
            </h2>
            <p className="form-subtitle">
              {state === "Login"
                ? "Đăng nhập để tiếp tục mua sắm"
                : "Đăng ký để trải nghiệm mua sắm tuyệt vời"}
            </p>

            {/* Form Fields */}
            <form className="loginsignup-fields" onSubmit={(e) => e.preventDefault()}>
              {state === "Sign Up" && (
                <div className="input-group">
                  <label htmlFor="username">Họ và tên</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={changeHandler}
                    placeholder="Nhập họ và tên của bạn"
                    required
                  />
                </div>
              )}

              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                  placeholder="Nhập địa chỉ email"
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Mật khẩu</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={changeHandler}
                  placeholder="Nhập mật khẩu"
                  required
                />
              </div>

              {state === "Sign Up" && (
                <div className="loginsignup-agree">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                  />
                  <label htmlFor="terms">
                    Tôi đồng ý với <span>Điều khoản sử dụng</span> và{" "}
                    <span>Chính sách bảo mật</span>
                  </label>
                </div>
              )}

              <button
                className="submit-btn"
                onClick={() => {
                  state === "Login" ? login() : signup();
                }}
                disabled={loading}
                type="button"
              >
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : state === "Login" ? (
                  "Đăng nhập"
                ) : (
                  "Đăng ký"
                )}
              </button>

              {state === "Login" && (
                <div className="forgot-password">
                  <a href="#forgot">Quên mật khẩu?</a>
                </div>
              )}
            </form>

            <div className="divider">
              <span>HOẶC</span>
            </div>

            {/* Social Login Buttons */}
            <div className="social-login">
              <button
                className="social-btn facebook-btn"
                onClick={() => handleSocialLogin("Facebook")}
                type="button"
              >
                <svg className="social-icon" viewBox="0 0 24 24">
                  <path
                    fill="#1877f2"
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
                Facebook
              </button>
              <button
                className="social-btn google-btn"
                onClick={() => handleSocialLogin("Google")}
                type="button"
              >
                <svg className="social-icon" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  <path fill="none" d="M0 0h48v48H0z"/>
                </svg>
                Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
