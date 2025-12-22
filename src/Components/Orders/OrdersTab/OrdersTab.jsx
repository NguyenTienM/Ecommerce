import React from "react";
import "./OrdersTab.css";

const OrdersTab = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <div className="order-container">
      <ul className="order-tabs">
        {tabs.map((tab, index) => {
          return (
            <li
              key={index}
              className={` tab-item ${activeTab === tab.value ? "active" : ""}`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default OrdersTab;
