import React, { useState, useEffect, useContext } from "react";
import "./ProductDisplay.css";
import { ShopContext } from "../../Context/ShopContext";
export const ProductDisplay = ({ product }) => {
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(ShopContext);

  // Khi product thay đổi, set lại state
  useEffect(() => {
    if (product && product.variations?.length > 0) {
      setSelectedVariation(product.variations[0]);
      setMainImage(product.variations[0].image);
    }
  }, [product]);

  // Nếu chưa có product hoặc variations chưa set thì return sớm
  if (!product) {
    return <div>Đang tải sản phẩm...</div>;
  }

  const { name, old_price, new_price, variations } = product;

  if (!selectedVariation) {
    return <div>Đang xử lý dữ liệu sản phẩm...</div>;
  }
  const handleAddToCart = () => {
    // Kiểm tra nếu chưa chọn size
    if (!selectedSize) {
      alert("Vui lòng chọn kích cỡ trước khi thêm vào giỏ hàng!");
      return;
    }

    // Tìm thông tin stock cho size đã chọn
    const selectedSizeInfo = selectedVariation.sizes.find(
      (s) => s.size === selectedSize
    );

    // Kiểm tra số lượng tồn kho
    if (!selectedSizeInfo || selectedSizeInfo.stock === 0) {
      alert("Sản phẩm này hiện đã hết hàng!");
      return;
    }

    if (quantity > selectedSizeInfo.stock) {
      alert(
        `Chỉ còn ${selectedSizeInfo.stock} sản phẩm trong kho. Vui lòng giảm số lượng!`
      );
      return;
    }

    const productToAdd = {
      productId: product.id,  // ✅ Đổi từ 'id' sang 'productId' để khớp với backend
      name: name,
      image: mainImage,
      price: new_price || old_price,
      size: selectedSize,
      color: selectedVariation.color,
      quantity: quantity,
      gender: product.gender, // Thêm gender từ product
      maxStock: selectedSizeInfo.stock, // Thêm thông tin stock để validate sau
    };
    console.log("Product to add:", productToAdd);
    addToCart(productToAdd);
  };

  const thumbs =
    variations.length === 1
      ? Array(4).fill(variations[0].image)
      : variations.map((v) => v.image);

  const handleVariationSelect = (variation) => {
    setSelectedVariation(variation);
    setMainImage(variation.image);
    setSelectedSize("");
  };
  return (
    <div className="pd-wrap">
      <div className="pd-left">
        <div className="pd-thumbs">
          {thumbs.map((img, idx) => (
            <div
              key={idx}
              className={`pd-thumb-wrapper ${
                mainImage === img ? "active-thumb" : ""
              }`}
              onClick={() => setMainImage(img)}
            >
              <img src={img} alt={`thumb-${idx}`} className="pd-thumb-img" />
            </div>
          ))}
        </div>
        <div className="pd-main">
          <img src={mainImage} alt={name} className="pd-main-img" />
        </div>
      </div>

      <div className="pd-right">
        <h1 className="pd-title">{name}</h1>

        {/* Màu sắc */}
        <div className="pd-section pd-color">
          <div className="pd-label">Màu sắc:</div>
          <div className="pd-colors">
            {variations.map((v, i) => (
              <div
                key={i}
                className={`pd-color-swatch ${
                  v.color === selectedVariation.color ? "selected" : ""
                }`}
                style={{ backgroundColor: v.colorCode }}
                onClick={() => handleVariationSelect(v)}
                title={v.color}
              ></div>
            ))}
          </div>
          <div className="pd-color-name">{selectedVariation.color}</div>
        </div>

        {/* Size */}
        <div className="pd-section pd-size">
          <div className="pd-label">Kích cỡ:</div>
          <div className="pd-sizes">
            {selectedVariation.sizes.map((s, i) => (
              <button
                key={i}
                className={`pd-size-btn ${
                  selectedSize === s.size ? "selected" : ""
                } ${s.stock === 0 ? "out" : ""}`}
                disabled={s.stock === 0}
                onClick={() => setSelectedSize(s.size)}
              >
                {s.size}
              </button>
            ))}
          </div>
          <a href="#" className="pd-size-guide">
            Kiểm tra kích cỡ
          </a>
        </div>

        {/* Giá và rating */}
        <div className="pd-price-rating">
          <div className="pd-prices">
            <div
              className={`pd-price ${
                old_price !== new_price ? "discount" : ""
              }`}
            >
              {old_price.toLocaleString()} VND
            </div>

            {old_price !== new_price && (
              <div className="new_price">{new_price.toLocaleString()} VND</div>
            )}
          </div>

          <div className="pd-rating">
            ★★★★★ <span className="pd-review-count">(29)</span>
          </div>
        </div>

        {/* Nút tăng giảm */}
        <div className="pd-quantity-section">
          <div className="pd-quantity">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
              −
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => {
                // Tìm stock cho size đã chọn
                const selectedSizeInfo = selectedSize
                  ? selectedVariation.sizes.find((s) => s.size === selectedSize)
                  : null;
                const maxStock = selectedSizeInfo?.stock || 999;
                setQuantity((q) => Math.min(maxStock, q + 1));
              }}
            >
              +
            </button>
          </div>
          <div className="pd-stock-status">
            {selectedSize ? (
              (() => {
                const selectedSizeInfo = selectedVariation.sizes.find(
                  (s) => s.size === selectedSize
                );
                const stock = selectedSizeInfo?.stock || 0;
                if (stock === 0) return "Hết hàng";
                if (stock <= 5) return `Chỉ còn ${stock} sản phẩm`;
                return "Còn hàng";
              })()
            ) : (
              "Vui lòng chọn size"
            )}
          </div>
        </div>

        {/* Thêm vào giỏ */}
        <button className="pd-add-btn" onClick={() => handleAddToCart()}>
          THÊM VÀO GIỎ HÀNG
        </button>

        {/* Tìm sản phẩm còn hàng */}
        <a href="#" className="pd-find-store">
          Tìm sản phẩm còn hàng trong cửa hàng
        </a>
      </div>
    </div>
  );
};
