import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>О нас</h3>
          <p>My Shop - ваш надежный интернет-магазин</p>
        </div>
        
        <div className="footer-section">
          <h3>Навигация</h3>
          <Link to="/">Главная</Link>
          <Link to="/catalog">Каталог</Link>
          <Link to="/cart">Корзина</Link>
        </div>
        
        <div className="footer-section">
          <h3>Контакты</h3>
          <p>Email: info@myshop.com</p>
          <p>Телефон: +7 (999) 123-45-67</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 My Shop. Все права защищены.</p>
      </div>
    </footer>
  );
}

export default Footer; 