export const users = [
  {
    id: 1,
    email: "test@test.com",
    password: "password123", // В реальном приложении пароли должны быть захешированы
    name: "Тестовый Пользователь",
    phone: "+7 (999) 123-45-67",
    address: "г. Москва, ул. Примерная, д. 1",
    isAdmin: false
  },
  {
    id: 2,
    email: "admin@test.com",
    password: "admin123",
    name: "Администратор",
    phone: "+7 (999) 765-43-21",
    address: "г. Санкт-Петербург, ул. Тестовая, д. 2",
    isAdmin: true
  }
];

export const findUser = (email, password) => {
  return users.find(user => user.email === email && user.password === password);
}; 