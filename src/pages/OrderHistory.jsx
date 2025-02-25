import React from 'react';
import { useSelector } from 'react-redux';
import { selectOrders } from '../store/cartSlice';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';

const OrderHistory = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const allOrders = useSelector(selectOrders);
  
  // Фильтруем заказы для текущего пользователя
  const userOrders = allOrders.filter(order => order.userId === currentUser?.id);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="order-history">
      <h2>История заказов</h2>
      {userOrders.length === 0 ? (
        <p>У вас пока нет заказов</p>
      ) : (
        <div className="orders-list">
          {userOrders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>Заказ #{order.id}</h3>
                <span className="order-date">
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </div>
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={`${order.id}-${item.id}-${index}`} className="order-item">
                    <span>{item.name}</span>
                    <span>× {item.quantity}</span>
                    <span>{item.price * item.quantity} ₽</span>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <div className="order-total">
                  <strong>Итого:</strong> {order.total} ₽
                </div>
                <Link 
                  to={`/profile/orders/${order.id}`} 
                  className="view-details-btn"
                >
                  Подробнее
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory; 