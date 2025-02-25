import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>О нас</h3>
          <p>Ваш надежный интернет-магазин</p>
        </div>
        <div className="footer-section">
          <h3>Контакты</h3>
          <p>Email: info@example.com</p>
          <p>Телефон: +7 (999) 123-45-67</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Ваш Магазин. Все права защищены.</p>
      </div>
    </footer>
  );
}

export default Footer; 