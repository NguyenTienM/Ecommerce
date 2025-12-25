import React from 'react';

export const FilterBar = ({ productCount }) => {
  return (
    <div className="filter-bar">
      {/* Row 1: Filters */}
      <div className="filter-left">
        <button className="filter-toggle">
          <span className="filter-icon">☰</span>
          Danh mục
        </button>
        <select className="filter-dropdown">
          <option>Chương trình khuyến mãi</option>
        </select>
        <select className="filter-dropdown">
          <option>Kích cỡ</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
        </select>
        <select className="filter-dropdown">
          <option>Màu sắc</option>
        </select>
        <select className="filter-dropdown">
          <option>Giá</option>
        </select>
      </div>

      {/* Row 2: Product Count & Sort */}
      <div className="filter-right">
        <span className="product-count">{productCount} Sản phẩm</span>
        <select className="sort-dropdown">
          <option>⇅ Sắp xếp theo</option>
          <option>Giá: Thấp đến cao</option>
          <option>Giá: Cao đến thấp</option>
          <option>Mới nhất</option>
        </select>
      </div>
    </div>
  );
};
