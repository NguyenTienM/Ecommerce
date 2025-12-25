import React, { useState } from 'react';
import userService from '../../../services/userService';
import { toast } from 'react-toastify';
import './ChangePassword.css';

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }

    setLoading(true);
    try {
      const response = await userService.changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );
      if (response.success) {
        toast.success(response.message);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Lỗi khi đổi mật khẩu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="change-password-container">
      <h2 className="page-title">Đổi mật khẩu</h2>
      <p className="page-subtitle">Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</p>

      <div className="password-form-wrapper">
        <form onSubmit={handleSubmit} className="password-form">
          <div className="form-group">
            <label>Mật khẩu hiện tại</label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handleChange}
              placeholder="Nhập mật khẩu hiện tại"
              required
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu mới</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handleChange}
              placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
              required
            />
          </div>

          <div className="form-group">
            <label>Xác nhận mật khẩu mới</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handleChange}
              placeholder="Nhập lại mật khẩu mới"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Đang cập nhật...' : 'Đổi mật khẩu'}
          </button>
        </form>

        <div className="password-tips">
          <h3>💡 Gợi ý mật khẩu mạnh:</h3>
          <ul>
            <li>Tối thiểu 6 ký tự</li>
            <li>Kết hợp chữ hoa, chữ thường</li>
            <li>Thêm số và ký tự đặc biệt</li>
            <li>Không sử dụng thông tin cá nhân</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
