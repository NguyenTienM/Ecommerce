import React from "react";
import Poster from "../../../Components/Poster/Poster";
import "./Kid.css";
import { getCategoriesByGender } from "../../../data/categoriesData";

const Kid = () => {
  const categories = getCategoriesByGender("kids");

  return (
    <div>
      <div className="kid-category">
        {categories.map((category) => (
          <Poster
            key={category.id}
            title={category.name}
            image={category.image}
            link={`/kids/${category.slug}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Kid;
