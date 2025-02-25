import { createSlice } from '@reduxjs/toolkit';

const loadOrders = () => {
  const savedOrders = localStorage.getItem('orders');
  return savedOrders ? JSON.parse(savedOrders) : [];
};

const saveOrders = (orders) => {
  localStorage.setItem('orders', JSON.stringify(orders));
};

const initialState = {
  items: [],
  orders: loadOrders(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    createOrder: (state, action) => {
      // Создаем уникальный ID для заказа
      const orderId = Date.now().toString();
      const newOrder = {
        ...action.payload,
        id: orderId,
        date: new Date().toISOString(),
        status: 'processing' // можно добавить статус заказа
      };
      
      // Добавляем заказ в список
      state.orders.push(newOrder);
      
      // Сохраняем в localStorage
      saveOrders(state.orders);
      
      // Очищаем корзину
      state.items = [];
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart,
  createOrder 
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => 
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
export const selectOrders = (state) => state.cart.orders;

export default cartSlice.reducer; 