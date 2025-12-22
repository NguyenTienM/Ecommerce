import React, { useState, useEffect, useContext } from "react";
import "./CheckoutDelivery.css";
import { useNavigate } from "react-router-dom";
import { CheckoutContext } from "../../../Context/CheckoutContext";

const CheckoutDelivery = () => {
  const [selectedMethod, setSelectedMethod] = useState("home"); // "home" | "store"
  const navigate = useNavigate();
  const [address, setAddress] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const { updateShippingAddress } = useContext(CheckoutContext);
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem("auth-token"); // 👈 bạn phải lưu token sau khi login
        const response = await fetch("http://localhost:4000/getAdress", {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token, // 👈 gửi token lên backend
          },
        });

        if (!response.ok) {
          throw new Error("Không thể tải địa chỉ");
        }

        const data = await response.json();
        setAddress(data);
        const defaultAddress = data.find((addr) => addr.isDefault);
        if (defaultAddress) {
          setSelectedId(defaultAddress._id);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchAddresses();
  }, []);
  const handleSelect = async (id) => {
    setSelectedId(id);
  };

  const handleNext = () => {
    if (selectedMethod === "home" && selectedId) {
      // Lấy địa chỉ đã chọn
      const selectedAddress = address.find((addr) => addr._id === selectedId);
      if (selectedAddress) {
        updateShippingAddress(selectedAddress);
      }
    }

    navigate("/checkout/payment");
  };

  return (
    <div className="container-delivery">
      {/* 1️⃣ TÙY CHỌN GIAO HÀNG */}
      <section className="delivery-section">
        <h1>1.Tùy chọn giao hàng</h1>
        <p className="delivery-note">
          Đủ điều kiện áp dụng miễn phí vận chuyển.
        </p>

        <div className="delivery-option">
          {/* Option 1 - Giao đến địa chỉ */}
          <label className="delivery-item">
            <input
              type="radio"
              name="delivery"
              value="home"
              checked={selectedMethod === "home"}
              onChange={() => setSelectedMethod("home")}
            />
            <div>
              <strong>Giao Đến Địa Chỉ</strong>
              <p>
                Phí vận chuyển: <b>MIỄN PHÍ</b>
              </p>
              <p className="delivery-desc">
                [Thời gian giao hàng dự kiến] TP. Hồ Chí Minh: 2 ngày; các tỉnh
                miền Nam khác: 3 ngày; Hà Nội: 3 ngày; các tỉnh miền Bắc khác: 4
                ngày; các tỉnh miền Trung: 3 ngày.
              </p>
            </div>
          </label>

          {/* Option 2 - Click & Collect */}
          <label className="delivery-item">
            <input
              type="radio"
              name="delivery"
              value="store"
              checked={selectedMethod === "store"}
              onChange={() => setSelectedMethod("store")}
            />
            <div>
              <strong>Click & Collect</strong>
              <p>
                Phí vận chuyển: <b>MIỄN PHÍ</b>
              </p>
              <p className="delivery-desc">
                Giao hàng trong 2 ngày - 2 cửa hàng được chọn (UNIQLO Đồng Khởi
                hoặc Vạn Hạnh Mall)... Khách hàng sẽ được thông báo qua email
                khi đơn hàng sẵn sàng để nhận.
              </p>
            </div>
          </label>
        </div>

        {/* Địa chỉ */}
        <div className="delivery-address-list">
          <h2>Địa chỉ giao hàng</h2>

          {address.map((addr) => (
            <div
              key={addr._id}
              className={`delivery-address ${
                selectedId === addr._id ? "selected" : ""
              }`}
            >
              <div>
                <p>
                  <b>
                    {addr.lastName} {addr.firstName}
                  </b>{" "}
                  (Địa chỉ thành viên)
                </p>
                <p>
                  {addr.detailAddress}, {addr.ward}, {addr.district},{" "}
                  {addr.province}
                </p>
                <p>
                  {addr.phone}
                  {addr.landline ? ` / ${addr.landline}` : ""}
                </p>
              </div>
              <div className="address-actions">
                {selectedId === addr._id ? (
                  <button className="selected-btn">✓ ĐÃ CHỌN</button>
                ) : (
                  <button
                    className="choose-btn"
                    onClick={() => handleSelect(addr._id)}
                  >
                    CHỌN
                  </button>
                )}
                <button className="edit-btn">SỬA</button>
              </div>
            </div>
          ))}
        </div>

        <div className="delivery-buttons">
          <button className="next-btn" onClick={() => handleNext()}>
            TIẾP TỤC THANH TOÁN
          </button>
          <button className="new-address-btn">ĐĂNG KÝ MỘT ĐỊA CHỈ MỚI</button>
        </div>
      </section>
    </div>
  );
};

export default CheckoutDelivery;
