import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../store/cartSlice';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const cartItems = useSelector(selectCartItems);
  const { isAuthenticated, currentUser, logout } = useAuth();

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          ShoesShop
        </Link>
        
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Главная</Link>
          <Link to="/catalog" className="nav-link">Каталог</Link>
          
          {isAuthenticated ? (
            <>
              {currentUser?.isAdmin && (
                <Link to="/admin" className="nav-link admin-link">
                  Админ-панель
                </Link>
              )}
              <Link to="/profile" className="nav-link">
                Личный кабинет
              </Link>
              <button onClick={logout} className="nav-link logout-btn">
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Войти</Link>
              <Link to="/register" className="nav-link">Регистрация</Link>
            </>
          )}
          
          <Link to="/cart" className="nav-link cart-link">
            Корзина
            {cartItemsCount > 0 && (
              <span className="cart-count">{cartItemsCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 