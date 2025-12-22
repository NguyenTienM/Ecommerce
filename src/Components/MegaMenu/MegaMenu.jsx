import React from "react";
import "./MegaMenu.css";
import { categories } from "../Assets/categories";

const MegaMenu = ({ type }) => {
  return (
    <div className="mega-menu">
      <div className="mega-menu-grid">
        {categories[type]?.map((cat) => (
          <div key={cat.slug} className="mega-menu-item">
            <img src={cat.icon} alt={cat.name} />
            <span>{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;
