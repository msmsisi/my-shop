import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectPopularProducts } from '../store/productsSlice';
import { addToCart } from '../store/cartSlice';

const Home = () => {
  const popularProducts = useSelector(selectPopularProducts);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Добро пожаловать в ShoesShop</h1>
          <p>Лучшая обувь для вашего комфорта</p>
          <Link to="/catalog" className="browse-catalog">
            Перейти в каталог
          </Link>
        </div>
      </section>

      <section className="popular-products">
        <h2>Популярные товары</h2>
        <div className="products-grid">
          {popularProducts.map(product => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} className="product-link">
                <img src={product.image} alt={product.name} className="product-image" />
                <h3>{product.name}</h3>
                <p className="price">{product.price} ₽</p>
              </Link>
              <button onClick={() => handleAddToCart(product)} className="add-to-cart">
                В корзину
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home; 