import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProducts, addProduct } from '../store/productsSlice';
import ProductCard from './ProductCard';
import './Catalog.css';

const Catalog = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const currentUser = useSelector(state => state.products.currentUser);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: ''
  });

  const isAdmin = currentUser?.email === 'admin@test.com';

  // Добавляем отладочную информацию
  console.log('Current user:', currentUser);
  console.log('Is admin:', isAdmin);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct({
      ...newProduct,
      price: Number(newProduct.price)
    }));
    setNewProduct({
      name: '',
      price: '',
      category: '',
      description: '',
      image: ''
    });
    setShowForm(false);
  };

  return (
    <div className="catalog-container">
      <h2>Каталог товаров</h2>
      
      {/* Добавляем информацию о текущем пользователе */}
      <div style={{ marginBottom: '20px', padding: '10px', background: '#f0f0f0' }}>
        <p>Текущий пользователь: {currentUser ? currentUser.email : 'Не авторизован'}</p>
        <p>Права администратора: {isAdmin ? 'Да' : 'Нет'}</p>
      </div>
      
      {/* Кнопка добавления товара для администратора */}
      {isAdmin && (
        <div className="admin-controls">
          <button 
            className="add-product-button"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Отменить' : 'Добавить новый товар'}
          </button>

          {showForm && (
            <form onSubmit={handleSubmit} className="add-product-form">
              <input
                type="text"
                placeholder="Название товара"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                required
              />
              <input
                type="number"
                placeholder="Цена"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                required
              />
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                required
              >
                <option value="">Выберите категорию</option>
                <option value="sneakers">Кроссовки</option>
                <option value="boots">Ботинки</option>
              </select>
              <textarea
                placeholder="Описание товара"
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="URL изображения"
                value={newProduct.image}
                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                required
              />
              <button type="submit" className="submit-button">
                Добавить товар
              </button>
            </form>
          )}
        </div>
      )}
      
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Catalog; 