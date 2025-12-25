import React from "react";
import { useContext } from "react";
import { ShopContext } from "../../../Context/ShopContext";
import { Outlet, useNavigate } from "react-router-dom";
import "./CheckoutLayout.css";
export default function CheckoutLayout() {
  const navigate = useNavigate();
  const { getTotalCartItems, getTotalCartAmount } = useContext(ShopContext);
  const handleCart = () => {
    navigate("/cart");
  };
  return (
    <div className="checkout-page">
      <div className="checkout-left">
        <Outlet />
      </div>

      {/* 2️⃣ Cột bên phải - Tổng đơn hàng */}
      <div className="checkout-right">
        <div className="order-summary">
          <div className="order-header">
            <span>TỔNG ĐƠN HÀNG | {getTotalCartItems()} SẢN PHẨM</span>
            <button className="edit-btn" onClick={handleCart}>
              SỬA
            </button>
          </div>

          <div className="order-details">
            <div>
              <span>Tổng cộng</span>
              <span>{getTotalCartAmount().toLocaleString()} VND</span>
            </div>
            <div>
              <span>Phí vận chuyển</span>
              <span>0 VND</span>
            </div>
            <div className="order-total">
              <span>
                <b>TỔNG</b>
              </span>
              <span>
                <b>{getTotalCartAmount().toLocaleString()} VND</b>
              </span>
            </div>
            <p className="tax-note">
              Đã bao gồm thuế giá trị gia tăng{" "}
              {(getTotalCartAmount() * 0.074).toLocaleString()} VND
            </p>
          </div>

          <div className="discount-section">
            <span>Phiếu giảm giá</span>
            <span>›</span>
          </div>
        </div>
      </div>
    </div>
  );
}
