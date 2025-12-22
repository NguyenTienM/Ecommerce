import React from "react";
import "./Women.css";
import Poster from "../../../Components/Poster/Poster";
import { getCategoriesByGender } from "../../../data/categoriesData";

const Women = () => {
  const categories = getCategoriesByGender("womens");

  return (
    <div className="women-category">
      {categories.map((category) => (
        <Poster
          key={category.id}
          title={category.name}
          image={category.image}
          link={`/womens/${category.slug}`}
        />
      ))}
    </div>
  );
};

export default Women;
