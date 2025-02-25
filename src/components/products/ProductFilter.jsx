import React from 'react';

function ProductFilter({ categories, activeCategory, onCategoryChange, onSearch }) {
  return (
    <div className="product-filter">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Поиск товаров..."
          onChange={(e) => onSearch(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="category-filter">
        <button
          className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => onCategoryChange('all')}
        >
          Все товары
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            {category === 'clothing' && 'Одежда'}
            {category === 'shoes' && 'Обувь'}
            {category === 'accessories' && 'Аксессуары'}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter; 