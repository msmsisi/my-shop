import React, { useState } from 'react';

// Временные тестовые данные
const initialOrders = [
  {
    id: 1,
    customerName: "Иван Петров",
    email: "ivan@example.com",
    total: 7500,
    status: "new",
    date: "2024-03-20",
    items: [
      { itemId: 101, name: "Футболка классическая", price: 1500, quantity: 2 },
      { itemId: 102, name: "Джинсы", price: 3500, quantity: 1 }
    ]
  },
  {
    id: 2,
    customerName: "Анна Сидорова",
    email: "anna@example.com",
    total: 5000,
    status: "processing",
    date: "2024-03-19",
    items: [
      { itemId: 103, name: "Кроссовки", price: 5000, quantity: 1 }
    ]
  }
];

function AdminOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, status: newStatus }));
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'new': return 'Новый';
      case 'processing': return 'В обработке';
      case 'shipped': return 'Отправлен';
      case 'delivered': return 'Доставлен';
      default: return status;
    }
  };

  return (
    <div className="admin-orders">
      <div className="orders-list">
        <h2>Заказы</h2>
        {orders.map(order => (
          <div 
            key={order.id} 
            className={`order-item ${order.status}`}
            onClick={() => setSelectedOrder(order)}
          >
            <div className="order-header">
              <span className="order-number">Заказ #{order.id}</span>
              <span className="order-date">{order.date}</span>
            </div>
            <div className="order-info">
              <p>{order.customerName}</p>
              <p className="order-total">{order.total} ₽</p>
              <span className={`order-status ${order.status}`}>
                {getStatusLabel(order.status)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <div className="order-details">
          <h3>Детали заказа #{selectedOrder.id}</h3>
          <div className="order-customer-info">
            <p><strong>Покупатель:</strong> {selectedOrder.customerName}</p>
            <p><strong>Email:</strong> {selectedOrder.email}</p>
            <p><strong>Дата заказа:</strong> {selectedOrder.date}</p>
          </div>
          
          <div className="order-items">
            <h4>Товары</h4>
            {selectedOrder.items.map(item => (
              <div key={item.itemId} className="order-item-detail">
                <span>{item.name}</span>
                <span>{item.quantity} шт.</span>
                <span>{item.price} ₽</span>
              </div>
            ))}
            <div className="order-total">
              <strong>Итого:</strong> {selectedOrder.total} ₽
            </div>
          </div>

          <div className="order-status-control">
            <h4>Статус заказа</h4>
            <select 
              value={selectedOrder.status}
              onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
            >
              <option value="new">Новый</option>
              <option value="processing">В обработке</option>
              <option value="shipped">Отправлен</option>
              <option value="delivered">Доставлен</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders; 