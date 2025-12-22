import React from "react";
import SideBar from "../../Components/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import "./AccountLayout.css";
const AccountLayout = () => {
  return (
    <div className="layout">
      <SideBar />
      <main className="layout-content">
        <div className="content-box">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AccountLayout;
