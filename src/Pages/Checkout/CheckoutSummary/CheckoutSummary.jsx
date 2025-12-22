import React, { useContext, useState } from "react";
import { CheckoutContext } from "../../../Context/CheckoutContext";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../../Context/ShopContext";
import "./CheckoutSummary.css"; // 👈 import CSS

const CheckoutSummary = () => {
  const { checkoutData, placeOrder } = useContext(CheckoutContext);
  const { cartItems } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await placeOrder();
      if (result.success) {
        navigate("/checkout/success");
      } else {
        setError("Đặt hàng thất bại!");
      }
    } catch (err) {
      setError("Có lỗi xảy ra: " + err.message);
    } finally {
      setLoading(false);
    }
  };
  console.log("Checkout Data:", checkoutData.shippingAddress);

  return (
    <div className="checkout-summary">
      <h1>3.Đơn hàng của bạn</h1>
      <div className="checkout-details">
        {" "}
        <p>
          <span>Số điện thoại đặt hàng:</span>{" "}
          {checkoutData.shippingAddress.phone}
        </p>
        <p>
          <span>Người nhận:</span> {checkoutData.shippingAddress.lastName}{" "}
          <b></b>
          {checkoutData.shippingAddress.firstName}{" "}
        </p>
        <p>
          <span>Địa chỉ giao hàng: </span>

          {checkoutData.shippingAddress
            ? `${checkoutData.shippingAddress.detailAddress}, ${checkoutData.shippingAddress.ward}, ${checkoutData.shippingAddress.district}, ${checkoutData.shippingAddress.province}`
            : "Chưa có địa chỉ"}
        </p>
        <p>
          <span> Phương thức thanh toán: </span>

          {checkoutData.paymentMethod || "Chưa chọn phương thức"}
        </p>
        {error && <p className="error">{error}</p>}
      </div>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} className="cart-item-img" />

            <div className="cart-item-content">
              {/* --- PHẦN TRÊN --- */}
              <div className="cart-item-top">
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>
                    Màu sắc: <span>{item.color}</span>
                  </p>
                  <p>
                    Kích cỡ: <span>{item.size}</span>
                  </p>
                  <p className="cart-item-price">
                    {item.price.toLocaleString()} VND
                  </p>
                </div>
              </div>

              {/* --- PHẦN DƯỚI --- */}
              <div className="cart-item-bottom">
                <div className="cart-item-actions">
                  <label>Số lượng: {item.quantity}</label>
                </div>

                <div className="cart-item-total">
                  TỔNG:{" "}
                  <strong>
                    {(item.price * item.quantity).toLocaleString()} VND
                  </strong>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={handlePlaceOrder} disabled={loading}>
        {loading ? "Đang xử lý..." : "Đặt hàng"}
      </button>
    </div>
  );
};

export default CheckoutSummary;
