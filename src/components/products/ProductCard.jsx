import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">{product.price} ₽</p>
      <div className="product-actions">
        <Link to={`/product/${product.id}`}>Подробнее</Link>
        <button onClick={() => addToCart(product)}>В корзину</button>
      </div>
    </div>
  );
}

export default ProductCard; 