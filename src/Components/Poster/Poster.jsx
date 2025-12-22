import React from "react";
import "./Poster.css";
import { Link } from "react-router-dom";

const Poster = ({ title, link, image }) => {
  return (
    <div className="poster">
      {/* Tên danh mục */}
      <h2 className="poster-title">{title}</h2>

      {/* Ảnh poster */}
      <Link to={link}>
        <img src={image} alt={title} className="poster-image" />
      </Link>

      {/* Nút CTA */}
      <div className="poster-footer">
        <Link to={link} className="poster-button">
          Xem sản phẩm
        </Link>
      </div>
    </div>
  );
};

export default Poster;
