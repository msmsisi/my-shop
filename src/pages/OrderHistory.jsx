import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function OrderHistory() {
  const { orders } = useCart();

  const getStatusLabel = (status) => {
    const statuses = {
      'new': 'Новый',
      'processing': 'В обработке',
      'shipped': 'Отправлен',
      'delivered': 'Доставлен',
      'cancelled': 'Отменён'
    };
    return statuses[status] || status;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (orders.length === 0) {
    return (
      <div className="orders-empty">
        <h2>У вас пока нет заказов</h2>
        <Link to="/catalog" className="button">
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h1>История заказов</h1>
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Заказ #{order.id}</h3>
                  <p className="order-date">{formatDate(order.date)}</p>
                </div>
                <span className={`order-status status-${order.status}`}>
                  {getStatusLabel(order.status)}
                </span>
              </div>

              <div className="order-details">
                <div className="order-items">
                  {order.items.map(item => (
                    <div key={item.cartItemId} className="order-item">
                      <div className="item-info">
                        <span className="item-name">{item.name}</span>
                        <span className="item-quantity">× {item.quantity}</span>
                      </div>
                      <span className="item-price">{item.price * item.quantity} ₽</span>
                    </div>
                  ))}
                </div>

                <div className="order-summary">
                  <div className="delivery-info">
                    <p><strong>Способ доставки:</strong> {order.deliveryMethod}</p>
                    <p><strong>Адрес:</strong> {order.address}</p>
                  </div>
                  <div className="order-total">
                    <strong>Итого:</strong>
                    <span>{order.total} ₽</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderHistory; 