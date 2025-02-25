import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import { selectOrders } from '../store/cartSlice';
import { Link, Navigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const orders = useSelector(selectOrders);

  // Если пользователь не авторизован, перенаправляем на страницу входа
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="profile-page">
      <h2>Личный кабинет</h2>
      
      <div className="profile-info">
        <h3>Информация о пользователе</h3>
        <div className="info-group">
          <label>Email:</label>
          <span>{currentUser?.email}</span>
        </div>
        {currentUser?.name && (
          <div className="info-group">
            <label>Имя:</label>
            <span>{currentUser.name}</span>
          </div>
        )}
      </div>

      <div className="recent-orders">
        <h3>Последние заказы</h3>
        {orders.length > 0 ? (
          <div className="orders-list">
            {orders.slice(0, 5).map(order => (
              <div key={order.id} className="order-item">
                <div className="order-header">
                  <span>Заказ #{order.id}</span>
                  <span>{new Date(order.date).toLocaleDateString()}</span>
                </div>
                <div className="order-total">
                  Сумма: {order.total} ₽
                </div>
              </div>
            ))}
            <Link to="/profile/orders" className="view-all-orders">
              Посмотреть все заказы
            </Link>
          </div>
        ) : (
          <p>У вас пока нет заказов</p>
        )}
      </div>
    </div>
  );
};

export default Profile; 