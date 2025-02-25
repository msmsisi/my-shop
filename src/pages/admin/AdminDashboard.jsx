import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>Admin Panel</h2>
        </div>
        <nav className="admin-nav">
          <Link 
            to="/admin" 
            className={`admin-nav-item ${activeSection === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveSection('overview')}
          >
            <i className="fas fa-home"></i>
            Обзор
          </Link>
          <Link 
            to="/admin/products" 
            className={`admin-nav-item ${activeSection === 'products' ? 'active' : ''}`}
            onClick={() => setActiveSection('products')}
          >
            <i className="fas fa-box"></i>
            Товары
          </Link>
          <Link 
            to="/admin/orders" 
            className={`admin-nav-item ${activeSection === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveSection('orders')}
          >
            <i className="fas fa-shopping-cart"></i>
            Заказы
          </Link>
          <Link 
            to="/admin/users" 
            className={`admin-nav-item ${activeSection === 'users' ? 'active' : ''}`}
            onClick={() => setActiveSection('users')}
          >
            <i className="fas fa-users"></i>
            Пользователи
          </Link>
          <Link 
            to="/admin/statistics" 
            className={`admin-nav-item ${activeSection === 'statistics' ? 'active' : ''}`}
            onClick={() => setActiveSection('statistics')}
          >
            <i className="fas fa-chart-bar"></i>
            Статистика
          </Link>
        </nav>
      </div>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard; 