import React, { useContext } from "react";
import OrderItem from "../OrderItem/OrderItem";
import "./OrderCard.css";
import { ShopContext } from "../../../Context/ShopContext";
import { Link } from "react-router-dom";
const OrderCard = ({ order }) => {
  return (
    <div className="order-card">
      <div className="order-header">
        <span>Mã đơn: {order._id}</span>
        <span className="order-status">{order.status}</span>
      </div>

      {/* Thông tin người nhận */}

      <div className="order-items">
        {order.products.map((item) => {
          return (
            <Link to={`/user/orders/${order._id}`}>
              <OrderItem key={item.productId} item={{ ...item }} />
            </Link>
          );
        })}
      </div>

      <div className="order-footer">
        <div className="order-infor">
          <p>Tổng tiền: {order.amount.toLocaleString()} VND</p>
          <p>Thanh toán: {order.paymentMethod}</p>
        </div>

        {order.status === "pending" && (
          <button className="cancel-btn">Hủy đơn</button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
