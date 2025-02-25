import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductList from './ProductList';
import AdminProductForm from './AdminProductForm';
import Login from './Login';
import { selectIsAdmin, selectCurrentUser, logout } from '../store/productsSlice';

const Home = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector(selectIsAdmin);
  const currentUser = useSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload(); // Перезагружаем страницу для очистки состояния
  };

  return (
    <div>
      {!currentUser && <Login />}
      {currentUser && (
        <div style={{ padding: '10px', background: '#f0f0f0', margin: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            Вы вошли как: {currentUser.email}
            {isAdmin && ' (Администратор)'}
          </div>
          <button 
            onClick={handleLogout}
            style={{
              padding: '5px 10px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Выйти
          </button>
        </div>
      )}
      {isAdmin && <AdminProductForm />}
      <ProductList />
    </div>
  );
};

export default Home; 