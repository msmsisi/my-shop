import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Загружаем корзину из localStorage при инициализации
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // Сохраняем корзину в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product) => {
    const cartItemId = Date.now();
    setCart([...cart, { ...product, cartItemId, quantity: 1 }]);
  };

  const removeFromCart = (cartItemId) => {
    setCart(cart.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item =>
      item.cartItemId === cartItemId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  const createOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      items: [...cart],
      total: getCartTotal(),
      status: 'new',
      date: new Date().toISOString().split('T')[0],
      ...orderData
    };

    setOrders([...orders, newOrder]);
    clearCart();
    return newOrder;
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      orders,
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      getCartTotal,
      getCartItemsCount,
      createOrder,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
} 