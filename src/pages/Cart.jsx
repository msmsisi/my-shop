import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  selectCartItems, 
  selectCartTotal, 
  removeFromCart, 
  updateQuantity 
} from '../store/cartSlice';

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity >= 1) {
      dispatch(updateQuantity({ id: productId, quantity }));
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Корзина пуста</h2>
        <Link to="/catalog" className="continue-shopping">
          Перейти к покупкам
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Корзина</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="price">{item.price} ₽</p>
            </div>
            <div className="quantity-controls">
              <button 
                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                className="quantity-btn"
              >
                -
              </button>
              <span className="quantity">{item.quantity}</span>
              <button 
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                className="quantity-btn"
              >
                +
              </button>
            </div>
            <button 
              onClick={() => handleRemoveFromCart(item.id)}
              className="remove-btn"
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="total">
          <span>Итого:</span>
          <span>{total} ₽</span>
        </div>
        <Link to="/checkout" className="checkout-btn">
          Оформить заказ
        </Link>
      </div>
    </div>
  );
};

export default Cart; 