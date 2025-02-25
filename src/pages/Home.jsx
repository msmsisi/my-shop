import React from 'react';
import ProductCard from '../components/products/ProductCard';
import { products } from '../data/products';

function Home() {
  return (
    <div className="home">
      <h1>Добро пожаловать в наш магазин</h1>
      <h2>Популярные товары</h2>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home; 