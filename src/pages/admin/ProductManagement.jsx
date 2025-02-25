import React, { useState } from 'react';

function ProductManagement() {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: '',
    stock: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const product = {
      ...newProduct,
      id: Date.now(),
      price: Number(newProduct.price),
      stock: Number(newProduct.stock)
    };

    setProducts(prev => {
      const updated = [...prev, product];
      localStorage.setItem('products', JSON.stringify(updated));
      return updated;
    });

    setNewProduct({
      name: '',
      price: '',
      description: '',
      image: '',
      category: '',
      stock: ''
    });
  };

  const handleDeleteProduct = (productId) => {
    setProducts(prev => {
      const updated = prev.filter(p => p.id !== productId);
      localStorage.setItem('products', JSON.stringify(updated));
      return updated;
    });
  };

  const handleEditProduct = (productId) => {
    const productToEdit = products.find(p => p.id === productId);
    if (productToEdit) {
      setNewProduct(productToEdit);
    }
  };

  return (
    <div className="product-management">
      <h2>Управление товарами</h2>

      <div className="admin-grid">
        <div className="product-form-section">
          <h3>Добавить новый товар</h3>
          <form onSubmit={handleAddProduct} className="admin-form">
            <div className="form-group">
              <label htmlFor="name">Название товара</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Цена</label>
              <input
                type="number"
                id="price"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Описание</label>
              <textarea
                id="description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">URL изображения</label>
              <input
                type="url"
                id="image"
                name="image"
                value={newProduct.image}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Категория</label>
              <input
                type="text"
                id="category"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="stock">Количество на складе</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={newProduct.stock}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="admin-button">
              Добавить товар
            </button>
          </form>
        </div>

        <div className="products-list-section">
          <h3>Список товаров</h3>
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p className="price">{product.price} ₽</p>
                  <p className="stock">На складе: {product.stock}</p>
                  <div className="product-actions">
                    <button 
                      className="edit-button"
                      onClick={() => handleEditProduct(product.id)}
                    >
                      Редактировать
                    </button>
                    <button 
                      className="delete-button"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductManagement; 