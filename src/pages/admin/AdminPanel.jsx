import React, { useState } from 'react';
import AdminMessages from './AdminMessages';
import AdminOrders from './AdminOrders';

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('messages');

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>Панель администратора</h1>
        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            Сообщения
          </button>
          <button
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            Заказы
          </button>
        </div>
      </div>

      <div className="admin-content">
        {activeTab === 'messages' && <AdminMessages />}
        {activeTab === 'orders' && <AdminOrders />}
      </div>
    </div>
  );
}

export default AdminPanel; 