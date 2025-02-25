import React, { createContext, useContext, useState, useEffect } from 'react';
import { users as initialUsers } from '../data/users';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Инициализируем список пользователей из localStorage или используем начальные данные
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : initialUsers;
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Сохраняем пользователей при изменении
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // Сохраняем текущего пользователя при изменении
  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  const register = (userData) => {
    // Проверяем, не существует ли уже пользователь с таким email
    if (users.some(u => u.email === userData.email)) {
      throw new Error('Пользователь с таким email уже существует');
    }

    // Создаем нового пользователя
    const newUser = {
      ...userData,
      id: Date.now() // Генерируем уникальный ID
    };

    // Добавляем пользователя в список
    setUsers([...users, newUser]);

    // Удаляем пароль из данных для текущей сессии
    const { password, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
  };

  const login = (email, password) => {
    const foundUser = users.find(u => 
      u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error('Неверный email или пароль');
    }

    // Удаляем пароль из данных для текущей сессии
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserProfile = (userId, newData) => {
    // Обновляем данные в списке пользователей
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, ...newData, password: u.password } // Сохраняем существующий пароль
        : u
    ));

    // Обновляем данные текущего пользователя
    if (user?.id === userId) {
      setUser({ ...user, ...newData });
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      users,
      register, 
      login, 
      logout,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 