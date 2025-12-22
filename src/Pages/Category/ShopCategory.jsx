import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ShopCategory.css";
import { Item } from "../../Components/Item/Item";

// Banner riêng theo category + gender + type
const banners = {
  tshirt: {
    male: {
      short: {
        title: "Áo Thun Nam Ngắn Tay",
        img: "https://im.uniqlo.com/global-cms/spa/res6e9f93ee03fab84e6e66c69fd7024d41fr.jpg",
      },
      long: {
        title: "Áo Thun Nam Dài Tay",
        img: "https://image.uniqlo.com/UQ/ST3/jp/imagesother/000_PLP/tops/t-shirts/25ss/men/LineupBanner-Long-sleeve-01-pc.jpg",
      },
    },
    female: {
      short: {
        title: "Áo Thun Nữ Ngắn Tay",
        img: "https://image.uniqlo.com/UQ/ST3/jp/imagesother/000_PLP/CoreT/25FW/Women/LineupBanner-w-Shortsleeve-pc-1-0630.jpg",
      },
      long: {
        title: "Áo Thun Nữ Dài Tay",
        img: "https://image.uniqlo.com/UQ/ST3/jp/imagesother/000_PLP/CoreT/25FW/Women/LineupBanner-w-LongSleeve-pc-1-0630.jpg",
      },
    },
    kid: {
      short: {
        title: "Áo Thun Trẻ Em Ngắn Tay",
        img: "https://image.uniqlo.com/UQ/ST3/jp/imagesother/000_PLP/CoreT/25SS/KIDS/LineupBanner-kids-Short_Sleeve-pc.jpg",
      },
      long: {
        title: "Áo Thun Trẻ Em Dài Tay",
        img: "https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/471696/item/goods_68_471696.jpg",
      },
    },
  },
  jacket: {
    male: {
      blouson: {
        title: "Áo Khoác Blouson Nam",
        img: "//im.uniqlo.com/global-cms/spa/resa479014c66c20cc6e9320396f98e8fdbfr.jpg",
      },
      hoodie: {
        title: "Áo Khoác Hoodie Nam",
        img: "https://image.uniqlo.com/UQ/ST3/jp/imagesother/000_PLP/outerwear/men/LineupBanner-Hoodie-01-pc.jpg",
      },
    },
    female: {
      parka: {
        title: "Áo Khoác Parka Nữ",
        img: "https://im.uniqlo.com/global-cms/spa/res3652b02d61bcd92ca043e051872f87eefr.jpg",
      },
      hoodie: {
        title: "Áo Khoác Hoodie Nữ",
        img: "https://image.uniqlo.com/UQ/ST3/jp/imagesother/000_PLP/outerwear/women/LineupBanner-Hoodie-01-pc.jpg",
      },
    },
    kid: {
      parka: {
        title: "Áo Khoác Parka Trẻ Em",
        img: "https://image.uniqlo.com/UQ/ST3/jp/imagesother/000_PLP/Casual-Outer/25FW/KIDS/LineupBanner-k-Parkas-pc-1.jpg",
      },
    },
  },
};

export const ShopCategory = () => {
  const { gender, category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading products:", err));
  }, []);

  // Chuẩn hoá gender trong DB (mens -> male)
  const genderMap = {
    mens: "male",
    womens: "female",
    kids: "kid",
  };
  const normalizedGender = genderMap[gender] || "unisex";

  // ✅ Lọc sản phẩm: lấy theo category và cho phép unisex hiển thị ở cả nam + nữ
  const categoryProducts = products.filter(
    (p) =>
      p.category === category &&
      (p.gender === normalizedGender ||
        (["male", "female"].includes(normalizedGender) &&
          p.gender === "unisex"))
  );

  // Lấy loại phụ (sleeve hoặc jacketType)
  const types = Array.from(
    new Set(
      category === "tshirt"
        ? categoryProducts.map((p) => p.sleeve)
        : categoryProducts.map((p) => p.jacketType)
    )
  );

  return (
    <div className="shop-category">
      {types.map((type) => {
        const typeProducts = categoryProducts.filter((p) =>
          category === "tshirt" ? p.sleeve === type : p.jacketType === type
        );

        const banner = banners?.[category]?.[normalizedGender]?.[type] ||
          banners?.[category]?.["unisex"]?.[type] || {
            title: "Sản phẩm",
            img: "https://via.placeholder.com/900x300?text=No+Banner",
          };

        return (
          <div key={type} className="type-section">
            <div className="banner">
              <h2>{banner.title}</h2>
              <div className="product-poster">
                <img src={banner.img} alt={banner.title} />
                <button>Xem sản phẩm</button>
              </div>
            </div>

            <div className="product-list">
              {typeProducts.map((product) => (
                <Item key={product._id} product={product} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
