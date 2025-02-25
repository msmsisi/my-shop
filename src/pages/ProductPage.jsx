import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('M');
  
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Товар не найден</h2>
        <button onClick={() => navigate('/catalog')}>Вернуться в каталог</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, size: selectedSize });
  };

  return (
    <div className="product-page">
      <div className="product-details">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="price">{product.price} ₽</p>
          
          <div className="product-options">
            <div className="size-selector">
              <h3>Выберите размер:</h3>
              <div className="size-buttons">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="product-description">
            <h3>Описание</h3>
            <p>{product.description || 'Описание товара отсутствует'}</p>
          </div>

          <div className="product-actions">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Добавить в корзину
            </button>
            <button className="back-btn" onClick={() => navigate('/catalog')}>
              Вернуться в каталог
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage; 