import React from 'react';
import { useParams } from 'react-router-dom';
import './ShopCategory.css';

// Custom hooks
import { useProducts, useProductTypes, useSelectedType } from '../../hooks/useShopCategory';

// Components
import { CategoryHeader } from '../../Components/CategoryHeader/CategoryHeader';
import { ProductTypeTabs } from '../../Components/ProductTypeTabs/ProductTypeTabs';
import { FilterBar } from '../../Components/FilterBar/FilterBar';
import { ProductGrid } from '../../Components/ProductGrid/ProductGrid';

// Utils
import { filterByCategory, filterByType, getCategoryName } from '../../utils/productFilters';

export const ShopCategory = () => {
  const { gender, category } = useParams();
  
  // Fetch data using custom hooks
  const { products, loading: productsLoading } = useProducts();
  const { productTypes, loading: typesLoading } = useProductTypes(category, gender);
  const selectedTypeSlug = useSelectedType();

  // Filter products
  const categoryProducts = filterByCategory(products, category, gender);
  const displayProducts = filterByType(categoryProducts, selectedTypeSlug);
  
  // Get category name
  const categoryName = getCategoryName(productTypes);

  // Loading state
  if (productsLoading || typesLoading) {
    return (
      <div className="shop-category">
        <div className="loading">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="shop-category">
      {/* Category Header */}
      <CategoryHeader categoryName={categoryName} />

      {/* Product Type Tabs */}
      <ProductTypeTabs 
        productTypes={productTypes} 
        selectedTypeSlug={selectedTypeSlug} 
      />

      {/* Filter Bar */}
      <FilterBar productCount={displayProducts.length} />

      {/* Product Grid */}
      <ProductGrid products={displayProducts} />
    </div>
  );
};
