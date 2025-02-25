import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal, createOrder } from '../store/cartSlice';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, isAuthenticated } = useAuth();
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    address: '',
    comment: ''
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [cartItems.length, isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createOrder({
      items: cartItems,
      total: total,
      userId: currentUser?.id,
      date: new Date().toISOString(),
      deliveryInfo: formData
    }));
    navigate('/profile/orders');
  };

  // Если нет товаров или пользователь не авторизован, 
  // показываем загрузку пока useEffect не выполнит редирект
  if (cartItems.length === 0 || !isAuthenticated) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="checkout-page">
      <h2>Оформление заказа</h2>
      <div className="checkout-container">
        <div className="order-summary">
          <h3>Ваш заказ</h3>
          {cartItems.map(item => (
            <div key={item.id} className="checkout-item">
              <span className="item-name">{item.name}</span>
              <span className="item-quantity">× {item.quantity}</span>
              <span className="item-price">{item.price * item.quantity} ₽</span>
            </div>
          ))}
          <div className="order-total">
            <strong>Итого:</strong>
            <span>{total} ₽</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>Данные для доставки</h3>
          
          <div className="form-group">
            <label htmlFor="name">ФИО:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Телефон:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+7 (___) ___-__-__"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Адрес доставки:</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Город, улица, дом, квартира"
            />
          </div>

          <div className="form-group">
            <label htmlFor="comment">Комментарий к заказу:</label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Необязательно"
            />
          </div>

          <button type="submit" className="submit-order-btn">
            Оформить заказ
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout; 