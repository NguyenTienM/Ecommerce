import React, { useState, useEffect } from "react";
import Poster from "../../../Components/Poster/Poster";
import { categoryService } from "../../../services/categoryService";
import "./Kid.css";

const Kid = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryService.getCategoriesByGender("kids")
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
    return <div className="kid-category loading">Đang tải...</div>;
  }

  return (
    <div>
      <div className="kid-category">
        {categories.map((category) => (
          <Poster
            key={category._id}
            title={category.name}
            image={category.image || "http://localhost:4000/images/default_category.jpg"}
            link={`/kids/${category.slug}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Kid;
