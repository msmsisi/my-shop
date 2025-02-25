import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import CategoryDropdown from './CategoryDropdown';

// Стилизованные компоненты
const NavContainer = styled.nav`
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  padding: 1rem 5%;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  
  &:hover {
    color: #3498db;
  }
`;

const SearchBar = styled.div`
  display: flex;
  gap: 0.5rem;
  flex: 0 1 400px;

  @media (max-width: 768px) {
    width: 100%;
  }

  input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: #3498db;
    }
  }

  button {
    padding: 0.5rem 1rem;
    background: #2c3e50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background: #3498db;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  a {
    color: #2c3e50;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.2s;

    &:hover {
      color: #3498db;
    }
  }
`;

const CartBadge = styled.span`
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  margin-left: 0.2rem;
`;

const Navbar = () => {
  // Получаем количество товаров в корзине из Redux store
  const cartItemsCount = useSelector(state => state.cart.items.length);

  return (
    <NavContainer>
      <NavContent>
        <Logo to="/">StyleStore</Logo>
        
        <SearchBar>
          <input 
            type="text" 
            placeholder="Поиск товаров..." 
            aria-label="Поиск"
          />
          <button>Поиск</button>
        </SearchBar>

        <NavLinks>
          <CategoryDropdown />
          <Link to="/account">
            <i className="fas fa-user"></i>
            Аккаунт
          </Link>
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
            Корзина
            {cartItemsCount > 0 && <CartBadge>{cartItemsCount}</CartBadge>}
          </Link>
        </NavLinks>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar; 