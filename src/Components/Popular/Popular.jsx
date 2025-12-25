import React, { useEffect, useState } from "react";
import "./Popular.css";
import { productService } from "../../services/productService";
import { Item } from "../Item/Item";

export const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);
  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const res = await productService.getPopularWomen();
        setPopularProducts(res);
      } catch (error) {
        console.error("Error fetching popular products:", error);
      }
    };
    fetchPopularProducts();
  }, []);
  return (
    <div className="popular">
      <h1>Phổ Biến Cho Nữ</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.map((item, i) => {
          return <Item key={item._id} product={item} />;
        })}
      </div>
    </div>
  );
};
