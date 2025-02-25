import React from 'react';

function AdminOverview() {
  return (
    <div className="admin-overview">
      <h2>Обзор</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Товары</h3>
          <p className="stat-number">150</p>
          <p className="stat-label">всего товаров</p>
        </div>
        <div className="stat-card">
          <h3>Заказы</h3>
          <p className="stat-number">24</p>
          <p className="stat-label">новых заказов</p>
        </div>
        <div className="stat-card">
          <h3>Пользователи</h3>
          <p className="stat-number">1,234</p>
          <p className="stat-label">активных пользователей</p>
        </div>
        <div className="stat-card">
          <h3>Продажи</h3>
          <p className="stat-number">₽156,789</p>
          <p className="stat-label">за последний месяц</p>
        </div>
      </div>
    </div>
  );
}

export default AdminOverview; 