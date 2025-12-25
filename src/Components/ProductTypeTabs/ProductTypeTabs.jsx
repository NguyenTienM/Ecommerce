import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const ProductTypeTabs = ({ productTypes, selectedTypeSlug }) => {
  const navigate = useNavigate();
  const { gender, category } = useParams();

  const handleTabClick = (typeSlug) => {
    if (typeSlug) {
      navigate(`/${gender}/${category}?type=${typeSlug}`);
    } else {
      navigate(`/${gender}/${category}`);
    }
  };

  return (
    <div className="product-type-tabs">
      <button
        className={!selectedTypeSlug ? 'tab-active' : ''}
        onClick={() => handleTabClick(null)}
      >
        Tất cả {productTypes[0]?.categoryId?.name || ''}
      </button>
      {productTypes.map((type) => (
        <button
          key={type._id}
          className={selectedTypeSlug === type.slug ? 'tab-active' : ''}
          onClick={() => handleTabClick(type.slug)}
        >
          {type.name}
        </button>
      ))}
    </div>
  );
};
