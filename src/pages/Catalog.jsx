import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllProducts } from '../store/productsSlice';
import { addToCart } from '../store/cartSlice';
import { useAuth } from '../context/AuthContext';

const Catalog = () => {
  const products = useSelector(selectAllProducts);
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="catalog">
      <h2>Каталог товаров</h2>
      
      {products.length === 0 ? (
        <div className="empty-catalog">
          <p>В каталоге пока нет товаров</p>
          {currentUser?.isAdmin && (
            <Link to="/admin" className="add-products-link">
              Добавить товары
            </Link>
          )}
        </div>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} className="product-link">
                {product.image && (
                  <img src={product.image} alt={product.name} className="product-image" />
                )}
                <h3>{product.name}</h3>
                <p className="price">{product.price} ₽</p>
              </Link>
              <button onClick={() => handleAddToCart(product)} className="add-to-cart">
                В корзину
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;