import React from "react";
import "./OrderSuccessModal.css";

const OrderSuccessModal = ({ show, onClose, orderCode }) => {
  if (!show) return null;

  return (
    <div className="success-modal-overlay" onClick={onClose}>
      <div className="success-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="success-checkmark">
          <svg className="check-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="#4caf50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h2 className="success-title">Đặt hàng thành công!</h2>
        
        <p className="success-message">
          Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn sớm nhất.
        </p>

        {orderCode && (
          <div className="order-code-box">
            <span className="order-code-label">Mã đơn hàng:</span>
            <span className="order-code-value">{orderCode}</span>
          </div>
        )}

        <div className="success-actions">
          <button className="btn-view-orders" onClick={onClose}>
            Xem đơn hàng
          </button>
          <button className="btn-continue-shopping" onClick={() => window.location.href = "/"}>
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
