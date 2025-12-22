import { useContext } from "react";
import "./Offers.css";
import { ShopContext } from "../../Context/ShopContext";
import { Item } from "../Item/Item";

export const Offers = () => {
  const { all_product } = useContext(ShopContext);
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Sản phẩm cho nam</h1>
      </div>
      <div className="offers-right">
        {all_product
          .filter((item) => item.gender === "male")
          .slice(0, 4)
          .map((item, i) => {
            return <Item key={item._id} product={item} />;
          })}
      </div>
    </div>
  );
};
