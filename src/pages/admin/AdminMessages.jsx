import React, { useState } from 'react';

// Временные тестовые данные
const initialMessages = [
  {
    id: 1,
    name: "Иван Петров",
    email: "ivan@example.com",
    message: "Здравствуйте, когда будет доступна доставка в другие города?",
    date: "2024-03-20",
    status: "new"
  },
  {
    id: 2,
    name: "Анна Сидорова",
    email: "anna@example.com",
    message: "Подскажите, есть ли у вас система скидок?",
    date: "2024-03-19",
    status: "read"
  }
];

function AdminMessages() {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const markAsRead = (messageId) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, status: 'read' } : msg
    ));
  };

  const deleteMessage = (messageId) => {
    setMessages(messages.filter(msg => msg.id !== messageId));
    setSelectedMessage(null);
  };

  return (
    <div className="admin-messages">
      <div className="messages-list">
        <h2>Сообщения от пользователей</h2>
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`message-item ${message.status === 'new' ? 'new' : ''}`}
            onClick={() => {
              setSelectedMessage(message);
              markAsRead(message.id);
            }}
          >
            <div className="message-header">
              <span className="message-name">{message.name}</span>
              <span className="message-date">{message.date}</span>
            </div>
            <div className="message-preview">
              {message.message.substring(0, 50)}...
            </div>
          </div>
        ))}
      </div>

      {selectedMessage && (
        <div className="message-details">
          <h3>Детали сообщения</h3>
          <div className="message-info">
            <p><strong>От:</strong> {selectedMessage.name}</p>
            <p><strong>Email:</strong> {selectedMessage.email}</p>
            <p><strong>Дата:</strong> {selectedMessage.date}</p>
          </div>
          <div className="message-content">
            <p>{selectedMessage.message}</p>
          </div>
          <div className="message-actions">
            <button 
              className="delete-btn"
              onClick={() => deleteMessage(selectedMessage.id)}
            >
              Удалить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminMessages; 