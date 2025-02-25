import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteProduct, selectIsAdmin } from '../store/productsSlice';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const isAdmin = useSelector(selectIsAdmin);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      dispatch(deleteProduct(product.id));
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">{product.price} ₽</p>
        <div className="product-actions">
          <Link to={`/product/${product.id}`} className="details-button">
            Подробнее
          </Link>
          <button onClick={handleAddToCart} className="add-to-cart-button">
            Добавить в корзину
          </button>
          {isAdmin && (
            <button onClick={handleDelete} className="delete-button">
              Удалить товар
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 