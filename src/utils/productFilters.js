/**
 * Filter products by category and gender
 */
export const filterByCategory = (products, category, gender) => {
  const genderMap = {
    mens: 'male',
    womens: 'female',
    kids: 'kid',
  };

  const normalizedGender = genderMap[gender] || 'unisex';

  return products.filter((p) => {
    const productCategory = p.categoryId?.slug;
    const productGender = p.gender;

    return (
      productCategory === category &&
      (productGender === normalizedGender ||
        (['male', 'female'].includes(normalizedGender) && productGender === 'unisex'))
    );
  });
};

/**
 * Filter products by product type
 */
export const filterByType = (products, typeSlug) => {
  if (!typeSlug) return products;
  
  return products.filter((p) => p.productTypeId?.slug === typeSlug);
};

/**
 * Get category display name
 */
export const getCategoryName = (productTypes) => {
  if (productTypes.length === 0) return '';
  return productTypes[0]?.categoryId?.name?.toUpperCase() || '';
};
