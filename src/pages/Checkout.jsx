import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Checkout() {
  const navigate = useNavigate();
  const { cart, getCartTotal, createOrder } = useCart();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    paymentMethod: 'card',
    deliveryMethod: 'courier'
  });

  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Ваша корзина пуста</h2>
        <button onClick={() => navigate('/catalog')} className="button">
          Перейти в каталог
        </button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const order = createOrder(formData);
      navigate('/order-success', { state: { orderId: order.id } });
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте снова.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Оформление заказа</h1>

        <div className="checkout-grid">
          <div className="checkout-form-container">
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-section">
                <h2>Контактные данные</h2>
                <div className="form-group">
                  <label htmlFor="name">Имя</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Телефон</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h2>Доставка</h2>
                <div className="form-group">
                  <label htmlFor="deliveryMethod">Способ доставки</label>
                  <select
                    id="deliveryMethod"
                    name="deliveryMethod"
                    value={formData.deliveryMethod}
                    onChange={handleInputChange}
                  >
                    <option value="courier">Курьером</option>
                    <option value="pickup">Самовывоз</option>
                    <option value="post">Почтой России</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="address">Адрес доставки</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h2>Оплата</h2>
                <div className="form-group">
                  <label htmlFor="paymentMethod">Способ оплаты</label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                  >
                    <option value="card">Банковской картой</option>
                    <option value="cash">Наличными при получении</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit" 
                className="submit-order-button"
                disabled={isProcessing}
              >
                {isProcessing ? 'Оформление...' : 'Оформить заказ'}
              </button>
            </form>
          </div>

          <div className="order-summary">
            <h2>Ваш заказ</h2>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.cartItemId} className="cart-item-summary">
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">× {item.quantity}</span>
                  </div>
                  <span className="item-price">
                    {item.price * item.quantity} ₽
                  </span>
                </div>
              ))}
            </div>
            <div className="order-total">
              <span>Итого:</span>
              <span className="total-price">{getCartTotal()} ₽</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout; 