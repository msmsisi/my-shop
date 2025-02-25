import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, selectAllProducts } from '../store/productsSlice';
import EditProduct from '../components/EditProduct';

const AdminPanel = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: '',
  });

  const [message, setMessage] = useState({ text: '', type: '' });

  // Проверяем авторизацию и права админа
  if (!isAuthenticated || !currentUser?.isAdmin) {
    return <Navigate to="/" />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      // Проверяем обязательные поля
      if (!productData.name || !productData.price || !productData.category) {
        setMessage({ text: 'Заполните все обязательные поля', type: 'error' });
        return;
      }

      // Создаем новый товар
      const newProduct = {
        ...productData,
        id: Date.now().toString(),
        price: Number(productData.price)
      };

      // Добавляем товар в store
      dispatch(addProduct(newProduct));

      // Очищаем форму
      setProductData({
        name: '',
        price: '',
        description: '',
        category: '',
        image: '',
      });

      setMessage({ text: 'Товар успешно добавлен', type: 'success' });
    } catch (error) {
      setMessage({ text: 'Ошибка при добавлении товара', type: 'error' });
    }
  };

  return (
    <div className="admin-panel">
      <h2>Панель администратора</h2>
      
      <div className="admin-actions">
        <button 
          className="add-product-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Скрыть форму' : 'Добавить новый товар'}
        </button>
      </div>

      {showAddForm && (
        <div className="admin-content">
          <section className="add-product-section">
            <h3>Добавить новый товар</h3>
            
            {message.text && (
              <div className={`message ${message.type}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="add-product-form">
              <div className="form-group">
                <label htmlFor="name">Название товара:*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Цена:*</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Категория:*</label>
                <select
                  id="category"
                  name="category"
                  value={productData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Выберите категорию</option>
                  <option value="sneakers">Кроссовки</option>
                  <option value="boots">Ботинки</option>
                  <option value="sandals">Сандалии</option>
                  <option value="slippers">Тапочки</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description">Описание:</label>
                <textarea
                  id="description"
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Изображение:</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                {productData.image && (
                  <div className="image-preview">
                    <img src={productData.image} alt="Preview" />
                  </div>
                )}
              </div>

              <button type="submit" className="submit-button">
                Добавить товар
              </button>
            </form>
          </section>
        </div>
      )}

      <div className="admin-products-list">
        <h3>Список товаров</h3>
        {products.map(product => (
          <div key={product.id} className="admin-product-item">
            {product.image && (
              <img 
                src={product.image} 
                alt={product.name} 
                className="admin-product-image"
              />
            )}
            <div className="admin-product-info">
              <h4>{product.name}</h4>
              <p>Цена: {product.price} ₽</p>
              <p>Категория: {product.category}</p>
            </div>
            <div className="admin-product-actions">
              <button 
                className="edit-btn"
                onClick={() => setEditingProduct(product)}
              >
                Редактировать
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingProduct && (
        <EditProduct 
          product={editingProduct} 
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
};

export default AdminPanel; 