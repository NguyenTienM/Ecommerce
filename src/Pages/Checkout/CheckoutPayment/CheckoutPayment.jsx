import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CheckoutContext } from "../../../Context/CheckoutContext";
import "./CheckoutPayment.css";

const CheckoutPayment = () => {
  const { updatePaymentMethod } = useContext(CheckoutContext);
  const [selectedMethod, setSelectedMethod] = useState("cod"); // mặc định COD
  const navigate = useNavigate();

  const handleNext = () => {
    updatePaymentMethod(selectedMethod); // 👈 lưu phương thức thanh toán vào context
    navigate("/checkout/summary"); // chuyển sang bước tổng đơn hàng
  };

  return (
    <div className="payment-container">
      <h1>2. PHƯƠNG THỨC THANH TOÁN</h1>
      <p>Vui lòng chọn phương thức thanh toán của bạn.</p>

      <div className="payment-options">
        <label>
          <input
            type="radio"
            name="payment"
            value="credit"
            checked={selectedMethod === "credit"}
            onChange={() => setSelectedMethod("credit")}
          />
          Thẻ Tín Dụng/Ghi Nợ
        </label>

        <label>
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={selectedMethod === "cod"}
            onChange={() => setSelectedMethod("cod")}
          />
          Thanh Toán Khi Giao Hàng
        </label>

        <label>
          <input
            type="radio"
            name="payment"
            value="momo"
            checked={selectedMethod === "momo"}
            onChange={() => setSelectedMethod("momo")}
          />
          Thanh Toán MoMo
        </label>

        <label>
          <input
            type="radio"
            name="payment"
            value="store"
            checked={selectedMethod === "store"}
            onChange={() => setSelectedMethod("store")}
          />
          Thanh Toán Tại Cửa Hàng
        </label>
      </div>

      {/* Nội dung thay đổi theo phương thức được chọn */}
      <div className="payment-detail">
        {selectedMethod === "credit" && (
          <div className="credit-form">
            <h4>ĐĂNG KÝ THẺ MỚI</h4>
            <div className="form-group">
              <label>Mã số thẻ*</label>
              <input type="text" placeholder="•••• •••• •••• ••••" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Ngày hết hạn*</label>
                <input type="text" placeholder="MM/YY" />
              </div>
              <div className="form-group">
                <label>Mã bảo mật*</label>
                <input type="text" placeholder="3 digits" />
              </div>
            </div>
            <div className="form-group">
              <label>Họ tên trên thẻ*</label>
              <input type="text" placeholder="Nguyen Van A" />
            </div>
            <label className="checkbox">
              <input type="checkbox" /> Lưu hoặc cập nhật thông tin thẻ
            </label>
          </div>
        )}

        {selectedMethod === "cod" && (
          <p className="payment-note">
            Vui lòng chỉ thanh toán khi nhận được hàng. Không chuyển khoản hoặc
            cung cấp thông tin cá nhân cho nhân viên giao hàng.
          </p>
        )}

        {selectedMethod === "momo" && (
          <p className="payment-note">
            Chọn tiếp tục để tiến hành thanh toán bằng thẻ MoMo. Bạn sẽ được
            chuyển hướng đến cổng thanh toán an toàn. Vui lòng hoàn tất trong 30
            phút sau khi nhấn “Đặt hàng”.
          </p>
        )}

        {selectedMethod === "store" && (
          <p className="payment-note">
            Vui lòng đến cửa hàng gần nhất để hoàn tất thanh toán và nhận hàng
            của bạn.
          </p>
        )}
      </div>

      <button className="continues-btn" onClick={handleNext}>
        TIẾP TỤC
      </button>
    </div>
  );
};

export default CheckoutPayment;
