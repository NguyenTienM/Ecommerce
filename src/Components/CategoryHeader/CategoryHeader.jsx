import React from 'react';

export const CategoryHeader = ({ categoryName }) => {
  return (
    <div className="category-header">
      <h1>{categoryName}</h1>
    </div>
  );
};
