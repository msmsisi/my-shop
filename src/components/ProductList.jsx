import React from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '../store/productsSlice';
import ProductCard from './ProductCard';

const ProductList = () => {
  const products = useSelector(selectProducts);

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList; 