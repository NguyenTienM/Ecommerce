import { all } from "axios";
import { CartItems } from "../../Components/CartItems/CartItems";
import { RelatedProducts } from "../../Components/RelatedProducts/RelatedProducts";
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import "./Cart.css";
export const Cart = () => {
  const genders = ["male", "female", "kid"];

  // Lấy ngẫu nhiên 1 giá trị
  const randomGender = genders[Math.floor(Math.random() * genders.length)];
  return (
    <div>
      <CartItems />
      <RelatedProducts gender={randomGender} />
    </div>
  );
};
export default Cart;
