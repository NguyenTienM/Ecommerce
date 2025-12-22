import React from "react";
import Poster from "../../../Components/Poster/Poster";
import "./Men.css";
import { getCategoriesByGender } from "../../../data/categoriesData";

const Men = () => {
  const categories = getCategoriesByGender("mens");

  return (
    <div className="men-category">
      {categories.map((category) => (
        <Poster
          key={category.id}
          title={category.name}
          image={category.image}
          link={`/mens/${category.slug}`}
        />
      ))}
    </div>
  );
};

export default Men;
