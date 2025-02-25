import React, { useState, useEffect, useCallback } from 'react';
import ProductCard from '../components/products/ProductCard';
import ProductFilter from '../components/products/ProductFilter';
import { products } from '../data/products';

function Catalog() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Получаем уникальные категории из продуктов
  const categories = [...new Set(products.map(product => product.category))];

  // Используем useCallback для мемоизации функции фильтрации
  const filterProducts = useCallback(() => {
    return products.filter(product => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Обновляем отфильтрованные товары при изменении категории или поискового запроса
  useEffect(() => {
    setFilteredProducts(filterProducts());
  }, [filterProducts]);

  return (
    <div className="catalog-page">
      <h2>Каталог товаров</h2>
      
      <ProductFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onSearch={setSearchQuery}
      />

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="no-products">Товары не найдены</p>
        )}
      </div>
    </div>
  );
}

export default Catalog; 