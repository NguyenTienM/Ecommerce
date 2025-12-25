import React from "react";
import "./RelateProduct.css";
import { Item } from "../Item/Item";
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
export const RelatedProducts = ({ gender }) => {
  const { all_product } = useContext(ShopContext);
  const related = all_product
    .filter((item) => item.gender === gender)
    .slice(0, 4);
  console.log(related);
  return (
    <div className="relatedproducts">
      <h1>Sản phẩm được quan tâm</h1>
      <hr />
      <div className="relatedproducts-item">
        {related.map((item, i) => {
          return <Item product={item} key={item._id} />;
        })}
      </div>
    </div>
  );
};
