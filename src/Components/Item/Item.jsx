import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

export const Item = ({ product }) => {
  if (!product) return null;
  const { name, gender, new_price, old_price, variations } = product;

  // Lấy ảnh và size đầu-cuối từ variation đầu tiên
  const firstVariation = variations?.[0];
  const firstImage = firstVariation?.image;
  const allSizes = firstVariation?.sizes?.map((s) => s.size) || [];

  return (
    <div className="product-card">
      {/* Ảnh sản phẩm */}
      <div className="product-image">
        <Link to={`/product/${product.id}`}>
          <img src={firstImage} alt={name} />
        </Link>
      </div>

      <div className="product-info">
        {/* Màu sắc */}
        <div className="colors">
          {variations?.map((v, idx) => (
            <span
              key={idx}
              className="color-dot"
              title={v.color}
              style={{ backgroundColor: v.colorCode }}
            ></span>
          ))}
        </div>

        {/* Giới tính + Size */}
        <div className="product-meta">
          <span className="gender">
            {gender === 'male' ? 'Nam' : 
             gender === 'female' ? 'Nữ' : 
             gender === 'unisex' ? 'Unisex' : 
             'Trẻ em'}
          </span>
          {allSizes.length > 0 && (
            <span className="size">
              {allSizes[0]}-{allSizes[allSizes.length - 1]}
            </span>
          )}
        </div>

        {/* Tên */}
        <p className="product-name">{name}</p>

        {/* Giá */}
        <p className="price">
          <span
            className={
              old_price !== new_price ? `old-price underline ` : `old-price`
            }
          >
            {old_price.toLocaleString()} VND
          </span>{" "}
          {old_price !== new_price && (
            <span className="new-price">{new_price.toLocaleString()} VND</span>
          )}
        </p>

        {/* Đánh giá giả lập (tuỳ bạn muốn có hay không) */}
        <div className="rating">
          ⭐ {Math.floor(Math.random() * 5) + 1} (
          {Math.floor(Math.random() * 200) + 1})
        </div>
      </div>
    </div>
  );
};
