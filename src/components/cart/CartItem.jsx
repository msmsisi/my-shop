import React from 'react';
import { useCart } from '../../context/CartContext';

function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p className="price">{item.price} ₽</p>
        {item.size && <p className="size">Размер: {item.size}</p>}
        <div className="quantity-controls">
          <button 
            className="quantity-btn"
            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
          >
            -
          </button>
          <span className="quantity">{item.quantity}</span>
          <button 
            className="quantity-btn"
            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
          >
            +
          </button>
        </div>
        <p className="item-total">Итого: {item.price * item.quantity} ₽</p>
      </div>
      <button 
        className="remove-button"
        onClick={() => removeFromCart(item.cartItemId)}
      >
        Удалить
      </button>
    </div>
  );
}

export default CartItem; 