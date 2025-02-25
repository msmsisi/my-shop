import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectProductById } from '../store/productsSlice';
import { addToCart } from '../store/cartSlice';
import { useAuth } from '../context/AuthContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  
  const product = useSelector(state => selectProductById(state, id));

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Товар не найден</h2>
        <button onClick={() => navigate('/catalog')} className="back-to-catalog">
          Вернуться в каталог
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="product-details-page">
      <div className="product-details-container">
        <div className="product-image-section">
          {product.image && (
            <img src={product.image} alt={product.name} className="product-image" />
          )}
        </div>
        
        <div className="product-info-section">
          <h2>{product.name}</h2>
          <p className="product-price">{product.price} ₽</p>
          
          <div className="product-description">
            <h3>Описание</h3>
            <p>{product.description || 'Описание отсутствует'}</p>
          </div>

          <button onClick={handleAddToCart} className="add-to-cart-btn">
            Добавить в корзину
          </button>

          {currentUser?.isAdmin && (
            <button 
              onClick={() => navigate('/admin')} 
              className="edit-product-btn"
            >
              Редактировать товар
            </button>
          )}
        </div>

        <div className="product-reviews-section">
          <h3>Отзывы</h3>
          {product.reviews && product.reviews.length > 0 ? (
            <div className="reviews-list">
              {product.reviews.map(review => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <span className="review-author">{review.author}</span>
                    <span className="review-date">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="review-text">{review.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Пока нет отзывов</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 