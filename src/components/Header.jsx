import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Header() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          My Shop
        </Link>

        <nav className="nav-menu">
          <Link to="/catalog">Каталог</Link>
          <Link to="/cart" className="cart-link">
            Корзина
            {cartItemsCount > 0 && <span className="cart-count">{cartItemsCount}</span>}
          </Link>
          {user ? (
            <>
              <Link to="/profile">Профиль</Link>
              {user.isAdmin && <Link to="/admin">Админ панель</Link>}
              <button onClick={logout} className="logout-button">
                Выйти
              </button>
            </>
          ) : (
            <Link to="/login">Войти</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header; 