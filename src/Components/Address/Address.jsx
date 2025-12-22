import React from "react";
import "./Address.css";
const Address = ({ orderInfo }) => {
  console.log(orderInfo);
  return (
    <div className="address">
      <h2 className="fullName">Tên: {orderInfo.fullName}</h2>
      <div className="address-details">
        <p className="phone">Số điện thoại: {orderInfo.phone}</p>
        <p className="address-text">
          Địa chỉ:
          {orderInfo.detailAddress}, {orderInfo.district}, {orderInfo.province}
        </p>
      </div>
    </div>
  );
};

export default Address;
