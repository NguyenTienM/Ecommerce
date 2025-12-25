import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import userService from '../../services/userService';
import { toast } from 'react-toastify';
import './Profile.css';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Load user data
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
      setAvatarPreview(user.avatar);
    }
  }, [user]);

  // Handle profile input change
  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  // Handle avatar selection
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Vui lòng chọn file ảnh');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Kích thước ảnh không được vượt quá 5MB');
      return;
    }

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload
    setLoading(true);
    try {
      const response = await userService.uploadAvatar(file);
      if (response.success) {
        toast.success(response.message);
        setUser({ ...user, avatar: response.avatar });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Lỗi khi upload ảnh');
      setAvatarPreview(user.avatar); // Revert preview
    } finally {
      setLoading(false);
    }
  };

  // Handle profile update
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await userService.updateProfile(profileData);
      if (response.success) {
        toast.success(response.message);
        setUser({ ...user, ...response.user });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Lỗi khi cập nhật thông tin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Hồ sơ của tôi</h2>
      <p className="profile-subtitle">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>

      <div className="profile-content">
        {/* Left: Profile Info */}
        <div className="profile-section">
          <h3>Thông tin cá nhân</h3>
          <form onSubmit={handleProfileSubmit}>
            <div className="form-group">
              <label>Họ và tên</label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                placeholder="Nhập họ và tên"
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                placeholder="Nhập email"
                required
              />
            </div>

            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
                placeholder="Nhập số điện thoại"
              />
            </div>

            <button 
              type="submit" 
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
          </form>
        </div>

        {/* Right: Avatar */}
        <div className="profile-section avatar-section">
          <div className="avatar-container">
            <img 
              src={avatarPreview || 'https://via.placeholder.com/150'} 
              alt="Avatar" 
              className="avatar-preview"
            />
            <label htmlFor="avatar-upload" className="avatar-upload-btn">
              <span>📷</span>
              Chọn ảnh
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
            />
          </div>
          <p className="avatar-hint">
            Dung lượng file tối đa 5MB<br/>
            Định dạng: .JPG, .PNG, .JPEG
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

