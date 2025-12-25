import React from 'react';
import { Item } from '../Item/Item';

export const ProductGrid = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="no-products">
        <h2>Chưa có sản phẩm nào</h2>
        <p>Sản phẩm đang được cập nhật. Vui lòng quay lại sau!</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <Item key={product._id} product={product} />
      ))}
    </div>
  );
};
