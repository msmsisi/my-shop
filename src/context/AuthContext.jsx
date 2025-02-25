import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [
      {
        id: 'admin',
        email: 'admin@test.com',
        password: 'admin123',
        name: 'Администратор',
        isAdmin: true
      }
    ];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const register = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      isAdmin: false // По умолчанию новые пользователи не админы
    };
    setUsers(prev => {
      const updatedUsers = [...prev, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      return updatedUsers;
    });
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  };

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{
      users,
      currentUser,
      isAuthenticated: !!currentUser,
      register,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
}; 