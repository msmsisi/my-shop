import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectOrders } from '../store/cartSlice';
import { useAuth } from '../context/AuthContext';

const OrderDetails = () => {
  const { orderId } = useParams();
  const { isAuthenticated } = useAuth();
  const allOrders = useSelector(selectOrders);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const order = allOrders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="order-not-found">
        <h2>Заказ не найден</h2>
        <Link to="/profile/orders" className="back-button">
          Вернуться к списку заказов
        </Link>
      </div>
    );
  }

  return (
    <div className="order-details-page">
      <div className="order-details-header">
        <h2>Заказ #{order.id}</h2>
        <span className="order-status">
          Статус: {order.status === 'processing' ? 'В обработке' : order.status}
        </span>
        <span className="order-date">
          от {new Date(order.date).toLocaleDateString()}
        </span>
      </div>

      <div className="order-details-container">
        <div className="order-items-section">
          <h3>Состав заказа</h3>
          <div className="order-items-list">
            {order.items.map((item, index) => (
              <div key={`${item.id}-${index}`} className="order-item-detail">
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p className="item-price">Цена: {item.price} ₽</p>
                  <p className="item-quantity">Количество: {item.quantity}</p>
                  <p className="item-subtotal">Сумма: {item.price * item.quantity} ₽</p>
                </div>
              </div>
            ))}
          </div>
          <div className="order-total">
            <strong>Итого:</strong>
            <span>{order.total} ₽</span>
          </div>
        </div>

        {order.deliveryInfo && (
          <div className="delivery-info-section">
            <h3>Информация о доставке</h3>
            <div className="delivery-details">
              <div className="info-group">
                <label>Получатель:</label>
                <span>{order.deliveryInfo.name}</span>
              </div>
              <div className="info-group">
                <label>Email:</label>
                <span>{order.deliveryInfo.email}</span>
              </div>
              <div className="info-group">
                <label>Телефон:</label>
                <span>{order.deliveryInfo.phone}</span>
              </div>
              <div className="info-group">
                <label>Адрес доставки:</label>
                <span>{order.deliveryInfo.address}</span>
              </div>
              {order.deliveryInfo.comment && (
                <div className="info-group">
                  <label>Комментарий:</label>
                  <span>{order.deliveryInfo.comment}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="order-actions">
        <Link to="/profile/orders" className="back-button">
          Вернуться к списку заказов
        </Link>
      </div>
    </div>
  );
};

export default OrderDetails; 