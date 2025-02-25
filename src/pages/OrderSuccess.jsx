import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function OrderSuccess() {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="order-success-page">
      <div className="order-success-container">
        <div className="success-icon">✓</div>
        <h1>Заказ успешно оформлен!</h1>
        <p className="order-number">Номер заказа: #{orderId}</p>
        <p className="success-message">
          Спасибо за ваш заказ! Мы отправили подтверждение на вашу почту.
        </p>
        <div className="success-actions">
          <Link to="/profile/orders" className="button">
            Мои заказы
          </Link>
          <Link to="/catalog" className="button secondary">
            Продолжить покупки
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess; 