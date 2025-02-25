import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct, deleteProduct } from '../store/productsSlice';

const EditProduct = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct(productData));
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      dispatch(deleteProduct(product.id));
      onClose();
    }
  };

  return (
    <div className="edit-product-modal">
      <div className="modal-content">
        <h3>Редактировать товар</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Название:</label>
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
            <label htmlFor="price">Цена:</label>
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
            <label htmlFor="category">Категория:</label>
            <select
              id="category"
              name="category"
              value={productData.category}
              onChange={handleChange}
              required
            >
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

          <div className="button-group">
            <button type="submit" className="save-btn">
              Сохранить
            </button>
            <button type="button" className="delete-btn" onClick={handleDelete}>
              Удалить
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct; 