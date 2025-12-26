import React, { useEffect, useState } from "react";
import "./MegaMenu.css";
import { useNavigate } from "react-router-dom";
import { categoryService } from "../../services/categoryService";
import { productTypeService } from "../../services/productTypeService";

const MegaMenu = ({ type }) => {
  const [categories, setCategories] = useState([]);
  const [productTypes, setProductTypes] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Map type to gender
  const genderMap = {
    men: "mens",
    women: "womens",
    kids: "kids",
  };
  const gender = genderMap[type] || type;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories for this gender using service
        const categoriesData = await categoryService.getCategoriesByGender(gender);
        setCategories(categoriesData);

        // Fetch product types for this gender using service
        const typesData = await productTypeService.getAllProductTypes();
        
        if (typesData.success) {
          // Group product types by category
          const grouped = {};
          typesData.data.forEach((type) => {
            const catId = type.categoryId._id;
            // Only include if category belongs to this gender
            if (categoriesData.some(cat => cat._id === catId)) {
              if (!grouped[catId]) {
                grouped[catId] = [];
              }
              grouped[catId].push(type);
            }
          });
          setProductTypes(grouped);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error loading menu data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [gender]);

  const handleCategoryClick = (categorySlug) => {
    const genderPath = type === "men" ? "mens" : type === "women" ? "womens" : "kids";
    navigate(`/${genderPath}/${categorySlug}`);
  };

  if (loading) {
    return (
      <div className="mega-menu">
        <div className="mega-menu-loading">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="mega-menu">
      <div className="mega-menu-container">
        {categories.map((cat) => (
          <div key={cat._id} className="mega-menu-category">
            {/* Category Header */}
            <div
              className="mega-menu-category-header"
              onClick={() => handleCategoryClick(cat.slug)}
            >
              {cat.image && <img src={cat.image} alt={cat.name} className="category-icon" />}
              <h3>{cat.name}</h3>
            </div>

            {/* Product Types List */}
            {productTypes[cat._id] && productTypes[cat._id].length > 0 && (
              <div className="mega-menu-types">
                {productTypes[cat._id].map((productType) => (
                  <div
                    key={productType._id}
                    className="mega-menu-type-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      const genderPath = type === "men" ? "mens" : type === "women" ? "womens" : "kids";
                      // Navigate with productType query param
                      navigate(`/${genderPath}/${cat.slug}?type=${productType.slug}`);
                    }}
                  >
                    {productType.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;
