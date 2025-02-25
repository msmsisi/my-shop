import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, selectIsAdmin } from '../store/productsSlice';
import './AdminProductForm.css';

const AdminProductForm = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector(selectIsAdmin);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(formData));
    setFormData({
      name: '',
      price: '',
      category: '',
      description: '',
      image: ''
    });
  };

  if (!isAdmin) return null;

  return (
    <div className="admin-form-container">
      <h2>Добавить новый товар</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="name">Название:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Цена:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Категория:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Выберите категорию</option>
            <option value="sneakers">Кроссовки</option>
            <option value="boots">Ботинки</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Описание:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">URL изображения:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://picsum.photos/300/300?random=5"
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Добавить товар
        </button>
      </form>
    </div>
  );
};

export default AdminProductForm; 