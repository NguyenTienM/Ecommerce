import React, { useContext } from "react";
import "./OrderList.css";
import OrderCard from "../OrderCard/OrderCard";
import { ShopContext } from "../../../Context/ShopContext";
const OrderList = ({ orders }) => {
  return (
    <div className="order-list">
      {orders.length > 0 ? (
        orders.map((order) => <OrderCard key={order.id} order={order} />)
      ) : (
        <p className="empty-msg">Chưa có đơn hàng</p>
      )}
    </div>
  );
};

export default OrderList;
