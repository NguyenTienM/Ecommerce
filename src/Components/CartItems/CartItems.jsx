import "./CartItems.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import Loading from "../Loading/Loading";

export const CartItems = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    cartLoading, 
    getTotalCartAmount, 
    removeFromCart, 
    updateCartQuantity, 
    all_product 
  } = useContext(ShopContext);
  
  console.log("Cart Items:", cartItems);
  console.log("Cart Items Gender Debug:", cartItems.map(item => ({ 
    name: item.name, 
    gender: item.gender,
    genderType: typeof item.gender
  })));
  
  const handleCheckout = () => {
    navigate("/checkout/delivery"); // 👉 điều hướng tới trang giao hàng
  };

  return (
    <div className="cart">
      <h2>GIỎ HÀNG</h2>
      {cartLoading ? (
        <Loading message="Đang tải giỏ hàng..." />
      ) : cartItems.length === 0 ? (
        <div className="cart-empty">
          {" "}
          <p>Không có sản phẩm nào trong giỏ hàng</p>{" "}
          <button className="continue-btn" onClick={() => navigate("/")}>
            TIẾP TỤC MUA SẮM
          </button>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map((item) => (
              
              <div className="cart-item" key={item._id}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-img"
                />

                <div className="cart-item-content">
                  {/* --- PHẦN TRÊN --- */}
                  <div className="cart-item-top">
                    <div className="cart-item-info">
                      <h3>{item.name}</h3>
                      <p>
                        Kiểu: <span>{(() => {
                          // Lấy gender từ item hoặc từ all_product nếu không có
                          let gender = item.gender;
                          if (!gender) {
                            const productInfo = all_product.find(p => p.id === item.productId);
                            gender = productInfo?.gender;
                          }
                          
                          if (gender === 'male') return 'Nam';
                          if (gender === 'female') return 'Nữ';
                          if (gender === 'unisex') return 'Unisex';
                          return 'Trẻ em';
                        })()}</span>
                      </p>
                      <p>
                        Màu sắc: <span>{item.color}</span>
                      </p>
                      <p>
                        Kích cỡ: <span>{item.size}</span>
                      </p>
                      <p className="cart-item-price">
                        {item.price.toLocaleString()} VND
                      </p>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item._id)}
                    >
                      ✕
                    </button>
                  </div>

                  {/* --- PHẦN DƯỚI --- */}
                  <div className="cart-item-bottom">
                    <div className="cart-item-actions">
                      <label>Số lượng:</label>
                      <select 
                        value={item.quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value);
                          // Tìm thông tin sản phẩm để lấy stock (sử dụng productId)
                          const productInfo = all_product.find(p => p.id === item.productId);
                          if (productInfo) {
                            const variation = productInfo.variations?.find(
                              v => v.color === item.color
                            );
                            const sizeInfo = variation?.sizes.find(
                              s => s.size === item.size
                            );
                            const maxStock = sizeInfo?.stock || 99;
                            updateCartQuantity(item._id, newQuantity, maxStock);
                          } else {
                            updateCartQuantity(item._id, newQuantity);
                          }
                        }}
                      >
                        {(() => {
                          // Tìm stock cho sản phẩm này (sử dụng productId)
                          const productInfo = all_product.find(p => p.id === item.productId);
                          const variation = productInfo?.variations?.find(
                            v => v.color === item.color
                          );
                          const sizeInfo = variation?.sizes.find(
                            s => s.size === item.size
                          );
                          const maxStock = sizeInfo?.stock || 10;
                          
                          // Tạo options từ 1 đến maxStock
                          return Array.from({ length: Math.min(maxStock, 10) }, (_, i) => i + 1).map((q) => (
                            <option key={q} value={q}>{q}</option>
                          ));
                        })()}
                      </select>
                      {(() => {
                        // Hiển thị thông tin stock (sử dụng productId)
                        const productInfo = all_product.find(p => p.id === item.productId);
                        const variation = productInfo?.variations?.find(
                          v => v.color === item.color
                        );
                        const sizeInfo = variation?.sizes.find(
                          s => s.size === item.size
                        );
                        const stock = sizeInfo?.stock || 0;
                        if (stock <= 5 && stock > 0) {
                          return <span style={{ fontSize: '12px', color: '#ff6b00', marginLeft: '8px' }}>Chỉ còn {stock}</span>;
                        }
                        return null;
                      })()}
                    </div>

                    <div className="cart-item-total">
                      TỔNG:{" "}
                      <strong>
                        {(item.price * item.quantity).toLocaleString()} VND
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* --- CỘT PHẢI: TÓM TẮT ĐƠN HÀNG --- */}
          <div className="cart-summary">
            <h3 className="summary-title">
              TỔNG ĐƠN HÀNG | {cartItems.length} SẢN PHẨM
            </h3>

            <div className="summary-box">
              <div className="summary-row">
                <span>Tổng cộng</span>
                <span>{getTotalCartAmount().toLocaleString()} VND</span>
              </div>
              <div className="summary-row">
                <span>Phí vận chuyển</span>
                <span>0 VND</span>
              </div>
              <div className="summary-row summary-total">
                <span>TỔNG</span>
                <span>{getTotalCartAmount().toLocaleString()} VND</span>
              </div>
              <div className="summary-row summary-vat">
                <span>Đã bao gồm thuế giá trị gia tăng</span>
                <span>
                  {(getTotalCartAmount() * 0.074).toLocaleString()} VND
                </span>
              </div>
              <div className="summary-row bold">
                <span>TỔNG ĐƠN ĐẶT HÀNG</span>
                <span>{getTotalCartAmount().toLocaleString()} VND</span>
              </div>
            </div>

            <div className="summary-options">
              <div className="summary-option">
                <i className="icon">🧾</i>
                <span>Phiếu giảm giá</span>
              </div>
              <div className="summary-option">
                <i className="icon">🎁</i>
                <span>Tùy chọn quà tặng</span>
              </div>
            </div>

            <p className="cart-note">
              Hoàn thành đơn đặt hàng trước 10 giờ sáng để được nhận hàng trong
              ngày tại các cửa hàng UNIQLO Đồng Khởi hoặc UNIQLO Vạn Hạnh Mall.
              Dịch vụ Click & Collect không tính phí giao hàng và không yêu cầu
              điều kiện tối thiểu...
            </p>

            <div className="cart-summary-buttons">
              <button className="checkout-btn" onClick={handleCheckout}>
                THANH TOÁN
              </button>
              <button className="continue-btn" onClick={() => navigate("/")}>
                TIẾP TỤC MUA SẮM
              </button>
            </div>

            <p className="cart-terms">Điều kiện áp dụng miễn phí vận chuyển.</p>
          </div>
        </div>
      )}
    </div>
  );
};
