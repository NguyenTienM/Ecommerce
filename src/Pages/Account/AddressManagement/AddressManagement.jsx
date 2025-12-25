import React, { useState, useEffect } from "react";
import "./AddressManagement.css";
import AddressForm from "../../../Components/AddressForm/AddressForm";
import { toast } from "react-toastify";
import { addressService } from "../../../services/addressService";

const AddressManagement = () => {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const data = await addressService.getAddresses();
      setAddresses(data);
    } catch (err) {
      console.error(err);
      toast.error("Không thể tải danh sách địa chỉ");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = async (formData) => {
    try {
      await addressService.addAddress(formData);
      toast.success("Thêm địa chỉ thành công!");
      setShowForm(false);
      fetchAddresses();
    } catch (err) {
      console.error(err);
      toast.error("Không thể thêm địa chỉ");
    }
  };

  const handleUpdateAddress = async (formData) => {
    try {
      await addressService.updateAddress(editingAddress._id, formData);
      toast.success("Cập nhật địa chỉ thành công!");
      setShowForm(false);
      setEditingAddress(null);
      fetchAddresses();
    } catch (err) {
      console.error(err);
      toast.error("Không thể cập nhật địa chỉ");
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa địa chỉ này?")) {
      return;
    }

    try {
      await addressService.deleteAddress(id);
      toast.success("Xóa địa chỉ thành công!");
      fetchAddresses();
    } catch (err) {
      console.error(err);
      toast.error("Không thể xóa địa chỉ");
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await addressService.setDefaultAddress(id);
      toast.success("Đã đặt làm địa chỉ mặc định!");
      fetchAddresses();
    } catch (err) {
      console.error(err);
      toast.error("Không thể đặt địa chỉ mặc định");
    }
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingAddress(null);
  };

  if (loading) {
    return (
      <div className="address-management">
        <div className="loading">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="address-management">
      <div className="address-header">
        <h1>Quản lý địa chỉ</h1>
        <button className="add-address-btn" onClick={() => setShowForm(true)}>
          + Thêm địa chỉ mới
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="empty-state">
          <p>Bạn chưa có địa chỉ nào</p>
          <button className="add-first-btn" onClick={() => setShowForm(true)}>
            Thêm địa chỉ đầu tiên
          </button>
        </div>
      ) : (
        <div className="address-list">
          {addresses.map((address) => (
            <div
              key={address._id}
              className={`address-card ${address.isDefault ? "default" : ""}`}
            >
              {address.isDefault && (
                <div className="default-badge">Địa chỉ mặc định</div>
              )}

              <div className="address-info">
                <h3>
                  {address.lastName} {address.firstName}
                </h3>
                <p className="phone">{address.phone}</p>
                {address.landline && (
                  <p className="landline">Điện thoại bàn: {address.landline}</p>
                )}
                <p className="address-text">
                  {address.detailAddress}, {address.ward}, {address.district},{" "}
                  {address.province}
                </p>
              </div>

              <div className="address-actions">
                <button
                  className="action-btn edit-btn"
                  onClick={() => handleEdit(address)}
                >
                  Sửa
                </button>
                <button
                  className="action-btn delete-btn"
                  onClick={() => handleDeleteAddress(address._id)}
                >
                  Xóa
                </button>
                {!address.isDefault && (
                  <button
                    className="action-btn default-btn"
                    onClick={() => handleSetDefault(address._id)}
                  >
                    Đặt làm mặc định
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <AddressForm
          mode={editingAddress ? "edit" : "add"}
          initialData={editingAddress}
          onSubmit={editingAddress ? handleUpdateAddress : handleAddAddress}
          onCancel={handleCloseForm}
        />
      )}
    </div>
  );
};

export default AddressManagement;
