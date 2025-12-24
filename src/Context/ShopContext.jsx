import React, { createContext, useEffect, useState, useContext } from "react";
import { cartService } from "../services/cartService";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { AuthContext } from "./AuthContext";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const navigate = useNavigate();
  const { accessToken } = useContext(AuthContext);
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  // Hàm fetch products (có thể gọi lại để refresh)
  const fetchProducts = async () => {
    try {
      const res = await cartService.getAllProducts();
      setAll_Product(res);
      console.log("🔄 Stock data refreshed");
    } catch (error) {
      console.error("❌ Error refreshing products:", error);
    }
  };

  // Hàm fetch cart
  const fetchCart = async () => {
    if (accessToken) {
      try {
        const res = await cartService.getCart();
        setCartItems(res);
      } catch (error) {
        console.error("❌ Error fetching cart:", error);
      }
    }
  };

  // Initial load
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  // Auto-refresh stock mỗi 30 giây
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchProducts();
    }, 30000); // 30 seconds

    // Cleanup khi component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Manual refresh function (có thể export để dùng ở component khác)
  const refreshProducts = () => {
    fetchProducts();
    toast.info("Đang cập nhật thông tin sản phẩm...");
  };

  // addToCart
  const addToCart = async (product) => {
    if (!accessToken) {
      toast.error("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
      navigate("/login");
      return;
    }
    try {
      let stockExceeded = false;
      setCartItems((prevCart) => {
        // Kiểm tra xem sản phẩm có cùng productId, size, color chưa
        const existingIndex = prevCart.findIndex(
          (item) =>
            item.productId === product.productId &&  // ✅ Đổi từ item.id sang item.productId
            item.color === product.color &&
            item.size === product.size
        );

        if (existingIndex >= 0) {
          // Nếu đã có => kiểm tra tồn kho trước khi tăng
          const updatedCart = [...prevCart];
          const newQuantity = updatedCart[existingIndex].quantity + product.quantity;
          const maxStock = product.maxStock || 999;
          
          if (newQuantity > maxStock) {
            stockExceeded = true;
            return prevCart; // Không thay đổi giỏ hàng
          }
          
          updatedCart[existingIndex].quantity = newQuantity;
          return updatedCart;
        } else {
          // Nếu chưa có => thêm mới
          return [...prevCart, { ...product, quantity: product.quantity }];
        }
      });

      if (stockExceeded) {
        toast.error("Số lượng vượt quá tồn kho có sẵn!");
        return;
      }

      // Gửi về backend (nếu có)
      await cartService.addToCart(product);
      toast.success("Đã thêm sản phẩm vào giỏ hàng!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng");
    }
  };
  
  // Xóa 1 sản phẩm khỏi giỏ hàng (dựa vào _id của object trong cart)
  const removeFromCart = async (cartItemId) => {
    try {
      // Gọi backend trước
      if (accessToken) {
        await cartService.removeFormCart(cartItemId);
      }
      
      // Sau khi backend thành công, mới update state
      setCartItems((prevItems) =>
        prevItems.filter((item) => item._id !== cartItemId)
      );
      
      console.log("Xóa item với id:", cartItemId);
      toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
    } catch (error) {
      console.error("❌ Lỗi khi xóa sản phẩm:", error);
      toast.error("Có lỗi xảy ra khi xóa sản phẩm");
    }
  };

  // Xóa toàn bộ giỏ hàng
  const clearCart = async () => {
    try {
      setCartItems([]); // reset frontend

      if (accessToken) {
        await cartService.clearCart();
      }
      toast.success("Đã xóa toàn bộ giỏ hàng");
    } catch (error) {
      console.error("❌ Lỗi khi xóa giỏ hàng:", error);
      toast.error("Có lỗi xảy ra khi xóa giỏ hàng");
    }
  };

  // Tính tổng tiền giỏ hàng
  const getTotalCartAmount = () => {
    if (!Array.isArray(cartItems)) return 0;

    return cartItems.reduce((total, item) => {
      const productInfo = all_product.find((p) => p.id === item.productId);

      // Dùng giá ưu đãi nếu có, không thì dùng giá cũ
      const price =
        item.price || productInfo?.new_price || productInfo?.old_price || 0;

      return total + price * item.quantity;
    }, 0);
  };

  // Tính tổng số lượng sản phẩm
  const getTotalCartItems = () => {
    if (!Array.isArray(cartItems)) return 0;

    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  const updateCartQuantity = async (cartItemId, newQuantity, maxStock) => {
    try {
      // Kiểm tra số lượng hợp lệ
      if (newQuantity < 1) {
        toast.error("Số lượng phải lớn hơn 0!");
        return;
      }

      if (maxStock && newQuantity > maxStock) {
        toast.error(`Chỉ còn ${maxStock} sản phẩm trong kho!`);
        return;
      }

      // Cập nhật state local
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === cartItemId ? { ...item, quantity: newQuantity } : item
        )
      );

      // Gửi về backend
      if (accessToken) {
        await cartService.updateCartQuantity(cartItemId, newQuantity);
      }

      toast.success("Đã cập nhật số lượng!");
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật số lượng:", error);
      toast.error("Có lỗi xảy ra khi cập nhật số lượng");
      
      // Reload lại giỏ hàng nếu có lỗi
      if (accessToken) {
        const updatedCart = await cartService.getCart();
        setCartItems(updatedCart);
      }
    }
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    updateCartQuantity,
    refreshProducts, // ✅ Export manual refresh function
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
