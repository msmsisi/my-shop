import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">{product.price} ₽</p>
      <div className="product-actions">
        <Link to={`/product/${product.id}`}>Подробнее</Link>
        <button onClick={handleAddToCart}>В корзину</button>
      </div>
    </div>
  );
};

export default ProductCard; 