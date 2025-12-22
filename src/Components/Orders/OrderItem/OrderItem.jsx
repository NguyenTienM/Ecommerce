import React from "react";
import "./OrderItem.css";
const OrderItem = ({ item }) => {
  console.log(item);
  return (
    <div className="order-item">
      <img src={item.image || ""} alt={item.name} />
      <div className="info">
        <p className="name">{item.name}</p>
        <p className="size">Size:{item.size}</p>
        <p className="color">Màu:{item.color}</p>
        <p className="quantity"> Số lượng: {item.quantity}</p>
        <p className="price">Giá: {item.price.toLocaleString()}VND</p>
      </div>
    </div>
  );
};

export default OrderItem;
