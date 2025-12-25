import { useState, useEffect } from 'react';
import productService from '../services/productService';
import productTypeService from '../services/productTypeService';

/**
 * Custom hook to fetch all products
 */
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    productService.getAllProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Error loading products:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { products, loading, error };
};

/**
 * Custom hook to fetch product types for a category
 */
export const useProductTypes = (category, gender) => {
  const [productTypes, setProductTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category || !gender) {
      setLoading(false);
      return;
    }

    productTypeService.getProductTypes(category, gender)
      .then((data) => {
        if (data.success) {
          setProductTypes(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Error loading product types:', err);
        setError(err);
        setLoading(false);
      });
  }, [category, gender]);

  return { productTypes, loading, error };
};

/**
 * Hook to get selected product type from URL
 */
export const useSelectedType = () => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get('type');
};
