import React, { useEffect, useState } from "react";
import { orderService } from "../../../services/orderService";
import { useParams } from "react-router-dom";
import OrderItem from "../../../Components/Orders/OrderItem/OrderItem";
import Address from "../../../Components/Address/Address";
import "./OrderDetail.css";

const OrderDetail = () => {
  const { orderId } = useParams();
  const [product, setProduct] = useState([]);
  const [infor, setInfor] = useState({});
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderCode, setOrderCode] = useState("");
   

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderService.getOrderById(orderId);
        console.log(res);
        if (res.success) {
          setInfor(res.order.shippingAddress);
          setProduct(res.order.products);
          setTotal(res.order.amount);
          setPaymentMethod(res.order.paymentMethod);
          setOrderCode(res.order.orderCode);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, [orderId]);

  return (
    <div className="order-detail">
      <h1>Mã đơn hàng: {orderCode}</h1>
      <Address orderInfo={infor} />
      <hr />
      {product.map((item) => {
        return <OrderItem item={item} />;
      })}
      <hr />
      <div className="order-summary">
        <table className="summary-table">
          <tbody>
            <tr>
              <td>Tổng tiền</td>
              <td className="value">{total.toLocaleString()} VND</td>
            </tr>
            <tr>
              <td>Phí giao hàng</td>
              <td className="value">0 VND</td>
            </tr>
            <tr className="total-row">
              <td>Thanh toán</td>
              <td className="total-value">{total.toLocaleString()} VND</td>
            </tr>
          </tbody>
        </table>

        <div className="notice">
          <span>⚠ </span>
          Thanh toán{" "}
          <span className="highlight">{total.toLocaleString()} VND </span>khi
          nhận hàng.
        </div>

        <div className="payment-method">
          <span>Phương thức</span>
          <span className="method">{paymentMethod}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
