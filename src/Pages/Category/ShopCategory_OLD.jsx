import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ShopCategory.css";
import { Item } from "../../Components/Item/Item";

export const ShopCategory = () => {
  const { gender, category } = useParams();
  const [products, setProducts] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Get productType from URL query params (e.g., ?type=short)
  const searchParams = new URLSearchParams(window.location.search);
  const selectedTypeSlug = searchParams.get('type');

  // Fetch products (with populated categoryId and productTypeId)
  useEffect(() => {
    fetch("http://localhost:4000/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        console.log("✅ Products loaded:", data.length);
      })
      .catch((err) => console.error("❌ Error loading products:", err));
  }, []);

  // Fetch product types cho category này
  useEffect(() => {
    if (category && gender) {
      fetch(`http://localhost:4000/api/v1/product-types?categorySlug=${category}&gender=${gender}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setProductTypes(data.data);
            console.log("✅ Product types loaded:", data.data.length);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("❌ Error loading product types:", err);
          setLoading(false);
        });
    }
  }, [category, gender]);

  // Map gender URL param → product gender value
  const genderMap = {
    mens: "male",
    womens: "female",
    kids: "kid",
  };
  const normalizedGender = genderMap[gender] || "unisex";

  // Filter products by category và gender
  const categoryProducts = products.filter((p) => {
    // Check categoryId.slug (populated object)
    const productCategory = p.categoryId?.slug;
    const productGender = p.gender;

    return (
      productCategory === category &&
      (productGender === normalizedGender ||
        (["male", "female"].includes(normalizedGender) &&
          productGender === "unisex"))
    );
  });

  // Debug logging
  console.log("� Filter results:", {
    totalProducts: products.length,
    categoryProducts: categoryProducts.length,
    category,
    gender,
    normalizedGender
  });

  if (categoryProducts.length > 0) {
    console.log("✅ Sample product:", categoryProducts[0]);
  } else if (products.length > 0) {
    console.log("� First product for comparison:", {
      name: products[0].name,
      categorySlug: products[0].categoryId?.slug,
      gender: products[0].gender
    });
  }

  // Don't return early - always show UI structure
  return (
    <div className="shop-category">
      {/* Category Header */}
      <div className="category-header">
        <h1>
          {category === 'tshirt' ? 'ÁO THUN' : 
           category === 'jacket' ? 'ÁO KHOÁC' :
           category === 'pants' ? 'QUẦN' :
           category === 'shirt' ? 'ÁO SƠ MI' :
           category === 'dress' ? 'VÁY' :
           category.toUpperCase()}
        </h1>
      </div>

      {/* Product Type Tabs */}
      <div className="product-type-tabs">
        <button
          className={!selectedTypeSlug ? 'tab-active' : ''}
          onClick={() => {
            const genderPath = gender;
            window.location.href = `/${genderPath}/${category}`;
          }}
        >
          Tất cả {category === 'tshirt' ? 'ÁO THUN' : 
                   category === 'jacket' ? 'ÁO KHOÁC' :
                   category === 'pants' ? 'QUẦN' :
                   category.toUpperCase()}
        </button>
        {productTypes.map((type) => (
          <button
            key={type._id}
            className={selectedTypeSlug === type.slug ? 'tab-active' : ''}
            onClick={() => {
              const genderPath = gender;
              window.location.href = `/${genderPath}/${category}?type=${type.slug}`;
            }}
          >
            {type.name}
          </button>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        {/* Row 1: Filters */}
        <div className="filter-left">
          <button className="filter-toggle">
            <span className="filter-icon">☰</span>
            Danh mục
          </button>
          <select className="filter-dropdown">
            <option>Chương trình khuyến mãi</option>
          </select>
          <select className="filter-dropdown">
            <option>Kích cỡ</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>
          <select className="filter-dropdown">
            <option>Màu sắc</option>
          </select>
          <select className="filter-dropdown">
            <option>Giá</option>
          </select>
        </div>

        {/* Row 2: Product Count & Sort */}
        <div className="filter-right">
          <span className="product-count">
            {selectedTypeSlug 
              ? categoryProducts.filter(p => p.productTypeId?.slug === selectedTypeSlug).length
              : categoryProducts.length
            } Sản phẩm
          </span>
          <select className="sort-dropdown">
            <option>⇅ Sắp xếp theo</option>
            <option>Giá: Thấp đến cao</option>
            <option>Giá: Cao đến thấp</option>
            <option>Mới nhất</option>
          </select>
        </div>
      </div>

      {/* Products Display */}
      {/* If selectedTypeSlug exists, filter to show only that type */}
      {selectedTypeSlug ? (
        // Show only selected product type
        (() => {
          console.log("🔍 Filtering by type:", selectedTypeSlug);
          console.log("📋 Available types:", productTypes.map(t => ({ name: t.name, slug: t.slug })));
          
          const selectedType = productTypes.find(t => t.slug === selectedTypeSlug);
          
          console.log("✅ Selected type:", selectedType);
          
          if (!selectedType) {
            return (
              <div className="no-products">
                <h2>Không tìm thấy loại sản phẩm</h2>
                <p>Loại sản phẩm "{selectedTypeSlug}" không tồn tại.</p>
              </div>
            );
          }

          const typeProducts = categoryProducts.filter(
            (p) => p.productTypeId?._id === selectedType._id
          );

          console.log("📊 Type products:", {
            selectedTypeId: selectedType._id,
            totalCategoryProducts: categoryProducts.length,
            matchingProducts: typeProducts.length,
            sampleProductTypeId: categoryProducts[0]?.productTypeId?._id
          });

          if (typeProducts.length === 0) {
            return (
              <div className="no-products">
                <h2>Chưa có sản phẩm nào</h2>
                <p>{selectedType.name} đang được cập nhật. Vui lòng quay lại sau!</p>
              </div>
            );
          }

          console.log("🎨 Rendering products:", typeProducts.length);
          console.log("Sample product:", typeProducts[0]);

          return (
            <div className="product-list">
              {typeProducts.map((product) => {
                console.log("Rendering product:", product.name, product._id);
                return <Item key={product._id} product={product} />;
              })}
            </div>
          );
        })()
      ) : (
        // Show all products in category (not grouped by type)
        <>
          {categoryProducts.length === 0 ? (
            <div className="no-products">
              <h2>Chưa có sản phẩm nào</h2>
              <p>Danh mục này đang được cập nhật. Vui lòng quay lại sau!</p>
            </div>
          ) : (
            <div className="product-list">
              {categoryProducts.map((product) => (
                <Item key={product._id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
