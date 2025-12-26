import React, { useState, useEffect } from "react";
import Poster from "../../../Components/Poster/Poster";
import { categoryService } from "../../../services/categoryService";
import "./Men.css";

const Men = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch categories for mens from API using service
    categoryService.getCategoriesByGender("mens")
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error loading categories:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="men-category loading">Đang tải...</div>;
  }

  return (
    <div className="men-category">
      {categories.map((category) => (
        <Poster
          key={category._id}
          title={category.name}
          image={category.image || "http://localhost:4000/images/default_category.jpg"}
          link={`/mens/${category.slug}`}
        />
      ))}
    </div>
  );
};

export default Men;
