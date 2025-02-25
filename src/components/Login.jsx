import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, selectCurrentUser } from '../store/productsSlice';
import { findUser } from '../data/users';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const user = findUser(email, password);
    if (user) {
      dispatch(setCurrentUser(user));
      console.log('Logged in as:', user.email);
    } else {
      alert('Неверные учетные данные!\nДля администратора:\nEmail: admin@test.com\nПароль: admin123');
    }
  };

  // Если пользователь уже вошел, не показываем форму
  if (currentUser) {
    return null;
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Вход в систему</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@test.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="admin123"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Войти
        </button>
        <p className="login-hint">
          Для входа как администратор используйте:<br />
          Email: admin@test.com<br />
          Пароль: admin123
        </p>
      </form>
    </div>
  );
};

export default Login; 