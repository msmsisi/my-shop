import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const { getCartItemsCount } = useCart();
  const { user, logout } = useAuth();
  const itemsCount = getCartItemsCount();

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Название магазина</Link>
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/catalog">Каталог</Link></li>
          <li><Link to="/contact">Контакты</Link></li>
          <li>
            <Link to="/cart" className="cart-link">
              Корзина
              {itemsCount > 0 && <span className="cart-badge">{itemsCount}</span>}
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/profile" className="auth-link">
                  Личный кабинет
                </Link>
              </li>
              <li>
                <button onClick={logout} className="auth-link">
                  Выйти
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="auth-link">
                  Вход
                </Link>
              </li>
              <li>
                <Link to="/register" className="auth-link">
                  Регистрация
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header; 