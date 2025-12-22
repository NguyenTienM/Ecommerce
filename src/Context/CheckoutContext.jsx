import React, { createContext, useState, useContext } from "react";
import { ShopContext } from "./ShopContext";
import { paymentService } from "../services/paymentService";

export const CheckoutContext = createContext();

export const CheckoutContextProvider = ({ children }) => {
  const { cartItems, clearCart, getTotalCartAmount } = useContext(ShopContext);

  const [checkoutData, setCheckoutData] = useState({
    shippingAddress: null,
    paymentMethod: "cod",
    note: "",
  });

  // -----------------------------
  // 🧩 Cập nhật dữ liệu checkout
  // -----------------------------
  const updateShippingAddress = (address) =>
    setCheckoutData((prev) => ({ ...prev, shippingAddress: address }));

  const updatePaymentMethod = (method) =>
    setCheckoutData((prev) => ({ ...prev, paymentMethod: method }));

  const updateNote = (note) => setCheckoutData((prev) => ({ ...prev, note }));

  // -----------------------------
  // 🏠 Tạo địa chỉ giao hàng hoàn chỉnh
  // -----------------------------
  const buildShippingAddress = (addr) => ({
    fullName: `${addr.firstName} ${addr.lastName}`.trim(),
    phone: addr.phone,
    province: addr.province,
    district: addr.district,
    ward: addr.ward,
    detailAddress: addr.detailAddress,
  });

  // -----------------------------
  // 💳 Hàm đặt hàng
  // -----------------------------
  const placeOrder = async () => {
    const token = localStorage.getItem("auth-token");
    if (!token) return alert("Vui lòng đăng nhập để đặt hàng");
    if (!checkoutData.shippingAddress)
      return alert("Vui lòng chọn địa chỉ giao hàng");
    if (!cartItems?.length) return alert("Giỏ hàng đang trống");

    const shippingAddress = buildShippingAddress(checkoutData.shippingAddress);
    console.log(
      "🏠 Địa chỉ giao hàng:",
      buildShippingAddress(checkoutData.shippingAddress)
    );
    const payload = {
      shippingAddress,
      products: cartItems.map((item) => ({
        productId: item._id,
        name: item.name,
        color: item.color,
        size: item.size,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      })),
      amount: getTotalCartAmount(),
      paymentMethod: checkoutData.paymentMethod,
      note: checkoutData.note.trim(),
    };

    try {
      console.log("📦 Payload gửi backend:", payload);

      let res;
      switch (checkoutData.paymentMethod) {
        case "cod": {
          res = await paymentService.codPayment(payload);
          alert("Đặt hàng thành công! Thanh toán khi nhận hàng.");
          clearCart();
          break;
        }

        case "momo": {
          res = await paymentService.momoPayment(payload);
          if (res?.payUrl) {
            window.location.href = res.payUrl; // Chuyển hướng sang MoMo
          } else {
            alert("Không tạo được link thanh toán MoMo!");
          }
          break;
        }

        default:
          alert("Phương thức thanh toán không hợp lệ!");
      }
    } catch (error) {
      console.error("🚨 Lỗi khi xử lý thanh toán:", error);
      alert("Không thể tạo đơn hàng!");
    }
  };

  return (
    <CheckoutContext.Provider
      value={{
        checkoutData,
        updateShippingAddress,
        updatePaymentMethod,
        updateNote,
        placeOrder,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
