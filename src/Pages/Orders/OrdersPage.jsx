import React from "react";
import { useState, useEffect } from "react";
import OrdersTab from "../../Components/Orders/OrdersTab/OrdersTab";
import OrderList from "../../Components/Orders/OrderList/OrderList";
import { orderService } from "../../services/orderService";
const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [orders, setOrders] = useState([]);

  const tabs = [
    { label: "tất cả", value: "all" },
    { label: "đang chờ xử lý", value: "pending" },
    { label: "đang vận chuyển", value: "shipping" },
    { label: "đang giao hàng", value: "delivering" },
    { label: "đã hoàn tất", value: "completed" },
    { label: "đã hủy", value: "cancelled" },
    { label: "đã trả lại/đã hoàn tiền", value: "returned/refunded" },
  ];
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getOrderUser(activeTab);
        if (response.success) {
          setOrders(response.orders);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, [activeTab]);
  return (
    <div>
      <OrdersTab
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
      />
      <OrderList orders={orders} />
    </div>
  );
};

export default OrdersPage;
