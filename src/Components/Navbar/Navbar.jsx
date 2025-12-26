import React, { useContext, useRef, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/mess.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/nav_dropdown.png";
import { AuthContext } from "../../Context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import Dropdown from "../Dropdown/Dropdown";
import MegaMenu from "../MegaMenu/MegaMenu";
import { useNavigate } from "react-router-dom";
export const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const [activeMega, setActiveMega] = useState(null);
  const { getTotalCartItems } = useContext(ShopContext);
  const { user, loading } = useContext(AuthContext);
  const nav = useNavigate();
  const menuRef = useRef();
  const closeTimeoutRef = useRef(null);

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  const handleMouseEnter = (type) => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMega(type);
  };

  const handleMouseLeave = () => {
    // Add delay before closing to allow mouse to reach MegaMenu
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMega(null);
    }, 200); // 200ms delay
  };

  return (
    <>
      <div className="navbar">
        <div className="nav-logo" onClick={() => nav("/")} style={{ cursor: "pointer" }}>
          <img src={logo} alt="" />
          <p>Uniqlo</p>
        </div>
        <img
          className="nav-dropdown"
          onClick={dropdown_toggle}
          src={nav_dropdown}
          alt=""
        />
        <ul ref={menuRef} className="nav-menu">
          <li
            className="nav-home"
            onMouseEnter={() => handleMouseEnter("shop")}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
              setMenu("shop");
              nav(`/`);
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/">
              Trang Chủ
            </Link>
            {menu === "shop" ? <hr /> : <></>}
          </li>
          <li
            onMouseEnter={() => handleMouseEnter("mens")}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
              setMenu("mens");
              nav("/mens");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/mens">
              Nam
            </Link>
            {menu === "mens" ? <hr /> : <></>}
            {activeMega === "mens" && <MegaMenu type="men" />}
          </li>
          <li
            onMouseEnter={() => handleMouseEnter("womens")}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
              setMenu("womens");
              nav("/womens");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/womens">
              Nữ
            </Link>
            {menu === "womens" ? <hr /> : <></>}
            {activeMega === "womens" && <MegaMenu type="women" />}
          </li>
          <li
            onMouseEnter={() => handleMouseEnter("kids")}
            onMouseLeave={handleMouseLeave}
            onClick={() => {
              setMenu("kids");
              nav("/kids");
            }}
          >
            <Link style={{ textDecoration: "none" }} to="/kids">
              Trẻ Em
            </Link>
            {menu === "kids" ? <hr /> : <></>}
            {activeMega === "kids" && <MegaMenu type="kids" />}
          </li>
        </ul>
        <div className="nav-login-cart">
          {loading ? (
            <div className="nav-auth-loading">
              <div className="nav-spinner"></div>
            </div>
          ) : user ? (
            <div className="nav-infor">
              <FaUserCircle />
              <span>{user.name}</span>
              <Dropdown />
            </div>
          ) : (
            <Link to="/login">
              <button>Đăng Nhập</button>
            </Link>
          )}
          <Link to="/cart" className="nav-cart-link">
            <img src={cart_icon} alt="" />
            <div className="nav-cart-count">{getTotalCartItems()}</div>
          </Link>
        </div>
      </div>
      {/* Overlay background when mega menu is active (only for category menus) */}
      {activeMega && activeMega !== "shop" && <div className="nav-overlay" onMouseEnter={handleMouseLeave}></div>}
    </>
  );
};
