import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';

function Cart() {
  const { cart, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Ваша корзина пуста</h2>
        <button onClick={() => navigate('/catalog')} className="button">
          Перейти в каталог
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Корзина</h1>
      <div className="cart-container">
        <div className="cart-items">
          {cart.map(item => (
            <CartItem key={item.cartItemId} item={item} />
          ))}
        </div>
        <div className="cart-summary">
          <div className="cart-total">
            <span>Итого:</span>
            <span className="total-price">{getCartTotal()} ₽</span>
          </div>
          <button 
            className="checkout-button"
            onClick={() => navigate('/checkout')}
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart; 