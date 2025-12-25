import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Dropdown.css";
import { AuthContext } from "../../Context/AuthContext";

const Dropdown = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      <ul className="user-dropdown">
        <li>
          <Link to="user/account/profile">Tài khoản của tôi</Link>
        </li>
        <li>
          <Link to="user/orders">Đơn hàng</Link>
        </li>
        <li>
          <div onClick={logout} className="dropdown-logout">Đăng Xuất</div>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
