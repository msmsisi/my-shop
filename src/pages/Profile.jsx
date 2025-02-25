import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Profile() {
  const { user, login } = useAuth();
  const { orders } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // В реальном приложении здесь будет запрос к API
    login({ ...user, ...formData });
    setIsEditing(false);
  };

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

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>Личный кабинет</h1>
        
        <div className="profile-section">
          <div className="profile-header">
            <h2>Личные данные</h2>
            <button 
              className="edit-button"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Отменить' : 'Редактировать'}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label htmlFor="name">Имя</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Адрес доставки</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <button type="submit" className="save-button">
                Сохранить изменения
              </button>
            </form>
          ) : (
            <div className="profile-info">
              <p><strong>Имя:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Телефон:</strong> {user.phone || 'Не указан'}</p>
              <p><strong>Адрес доставки:</strong> {user.address || 'Не указан'}</p>
            </div>
          )}
        </div>

        <div className="profile-section">
          <div className="profile-header">
            <h2>Последние заказы</h2>
            <Link to="/profile/orders" className="view-all-button">
              Все заказы
            </Link>
          </div>
          
          <div className="orders-list">
            {orders.length === 0 ? (
              <p className="no-orders">У вас пока нет заказов</p>
            ) : (
              orders.slice(0, 3).map(order => (
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
                  <div className="order-total">
                    <strong>Итого:</strong>
                    <span>{order.total} ₽</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile; 