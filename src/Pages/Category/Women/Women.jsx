import React, { useState, useEffect } from "react";
import "./Women.css";
import Poster from "../../../Components/Poster/Poster";

const Women = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/categories?gender=womens")
      .then((res) => res.json())
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
    return <div className="women-category loading">Đang tải...</div>;
  }

  return (
    <div className="women-category">
      {categories.map((category) => (
        <Poster
          key={category._id}
          title={category.name}
          image={category.image || "http://localhost:4000/images/default_category.jpg"}
          link={`/womens/${category.slug}`}
        />
      ))}
    </div>
  );
};

export default Women;
