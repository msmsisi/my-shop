import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/products'; // Убедитесь, что у вас есть этот файл

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  
  // Находим товар по ID
  const product = products.find(p => p.id === parseInt(productId));

  // Демо-данные отзывов (в реальном приложении должны храниться в базе данных)
  const [reviews, setReviews] = useState([
    {
      id: 1,
      userId: 'user1',
      userName: 'Анна',
      rating: 5,
      text: 'Отличный товар! Очень довольна покупкой.',
      date: '2024-03-15'
    },
    {
      id: 2,
      userId: 'user2',
      userName: 'Иван',
      rating: 4,
      text: 'Хорошее качество, но доставка могла быть быстрее.',
      date: '2024-03-14'
    }
  ]);

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Товар не найден</h2>
        <button onClick={() => navigate('/catalog')} className="button">
          Вернуться в каталог
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    const newReview = {
      id: Date.now(),
      userId: user.id,
      userName: user.name,
      rating,
      text: reviewText,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([newReview, ...reviews]);
    setReviewText('');
    setRating(5);
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-detail-grid">
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>
          
          <div className="product-info">
            <h1>{product.name}</h1>
            <div className="product-rating">
              <span className="stars">{'★'.repeat(Math.round(getAverageRating()))}</span>
              <span className="rating-value">({getAverageRating()})</span>
              <span className="reviews-count">({reviews.length} отзывов)</span>
            </div>
            
            <div className="product-price">
              <span className="price">{product.price} ₽</span>
              {product.oldPrice && (
                <span className="old-price">{product.oldPrice} ₽</span>
              )}
            </div>

            <div className="product-description">
              <h2>Описание</h2>
              <p>{product.description}</p>
            </div>

            <button onClick={handleAddToCart} className="add-to-cart-button">
              Добавить в корзину
            </button>
          </div>
        </div>

        <div className="product-reviews">
          <h2>Отзывы</h2>
          
          {user && (
            <form onSubmit={handleSubmitReview} className="review-form">
              <div className="rating-input">
                <label>Оценка:</label>
                <select 
                  value={rating} 
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  <option value="5">5 ★</option>
                  <option value="4">4 ★</option>
                  <option value="3">3 ★</option>
                  <option value="2">2 ★</option>
                  <option value="1">1 ★</option>
                </select>
              </div>

              <div className="review-text-input">
                <label>Ваш отзыв:</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                  placeholder="Поделитесь своими впечатлениями о товаре"
                />
              </div>

              <button type="submit" className="submit-review-button">
                Отправить отзыв
              </button>
            </form>
          )}

          <div className="reviews-list">
            {reviews.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <span className="reviewer-name">{review.userName}</span>
                  <span className="review-date">{review.date}</span>
                </div>
                <div className="review-rating">
                  {'★'.repeat(review.rating)}
                  {'☆'.repeat(5 - review.rating)}
                </div>
                <p className="review-text">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail; 