import React, { useState, useEffect } from "react";
import "./AddressForm.css";

const AddressForm = ({ mode, initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    province: "",
    district: "",
    ward: "",
    detailAddress: "",
    landline: "",
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        firstName: initialData.firstName || "",
        lastName: initialData.lastName || "",
        phone: initialData.phone || "",
        province: initialData.province || "",
        district: initialData.district || "",
        ward: initialData.ward || "",
        detailAddress: initialData.detailAddress || "",
        landline: initialData.landline || "",
      });
    }
  }, [mode, initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="address-form-overlay" onClick={onCancel}>
      <div className="address-form-container" onClick={(e) => e.stopPropagation()}>
        <div className="form-header">
          <h2>{mode === "edit" ? "Sửa địa chỉ" : "Thêm địa chỉ mới"}</h2>
          <button className="close-btn" onClick={onCancel}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="address-form">
          <div className="form-row">
            <div className="form-group">
              <label>Họ *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Nguyễn"
                required
              />
            </div>
            <div className="form-group">
              <label>Tên *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Văn A"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Số điện thoại *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0901234567"
                pattern="^(0|\+84)[0-9]{9,10}$"
                required
              />
            </div>
            <div className="form-group">
              <label>Điện thoại bàn</label>
              <input
                type="tel"
                name="landline"
                value={formData.landline}
                onChange={handleChange}
                placeholder="02812345678"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Tỉnh/Thành phố *</label>
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleChange}
              placeholder="TP. Hồ Chí Minh"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Quận/Huyện *</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="Quận 1"
                required
              />
            </div>
            <div className="form-group">
              <label>Phường/Xã *</label>
              <input
                type="text"
                name="ward"
                value={formData.ward}
                onChange={handleChange}
                placeholder="Phường Bến Nghé"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Địa chỉ chi tiết *</label>
            <textarea
              name="detailAddress"
              value={formData.detailAddress}
              onChange={handleChange}
              rows="3"
              placeholder="Số nhà, tên đường, tòa nhà..."
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Hủy
            </button>
            <button type="submit" className="btn-submit">
              {mode === "edit" ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
