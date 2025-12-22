import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./SideBar.css";
import { FaUser } from "react-icons/fa";
import { FaRegListAlt } from "react-icons/fa";

const SideBar = () => {
  const [openAccountMenu, setOpenAccountMenu] = useState(true);

  return (
    <aside className="sidebar">
      <ul>
        {/* Tài khoản của tôi */}
        <li>
          <NavLink
            to="account/profile"
            className="menu-link"
            onClick={() => setOpenAccountMenu(!openAccountMenu)}
          >
            <FaUser />
            Tài khoản của tôi
          </NavLink>

          {openAccountMenu && (
            <ul className="submenu">
              <li>
                <NavLink
                  to="account/profile"
                  className={({ isActive }) =>
                    isActive ? "active-link submenu-link " : "submenu-link"
                  }
                >
                  Thông tin cá nhân
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="account/address"
                  className={({ isActive }) =>
                    isActive ? "active-link submenu-link " : "submenu-link"
                  }
                >
                  Địa chỉ
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="account/password"
                  className={({ isActive }) =>
                    isActive ? "active-link submenu-link " : "submenu-link"
                  }
                >
                  Mật khẩu
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {/* Đơn mua */}
        <li>
          <NavLink
            to="/user/orders"
            className={({ isActive }) =>
              isActive ? "menu-link active-link" : "menu-link"
            }
          >
            <FaRegListAlt /> Đơn mua
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
