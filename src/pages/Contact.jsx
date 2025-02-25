import React from 'react';

function Contact() {
  return (
    <div className="contact">
      <h2>Свяжитесь с нами</h2>
      <div className="contact-info">
        <p>Email: info@example.com</p>
        <p>Телефон: +7 (999) 123-45-67</p>
        <p>Адрес: ул. Примерная, д. 1</p>
      </div>
      <form className="contact-form">
        <input type="text" placeholder="Ваше имя" />
        <input type="email" placeholder="Ваш email" />
        <textarea placeholder="Ваше сообщение"></textarea>
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
}

export default Contact; 