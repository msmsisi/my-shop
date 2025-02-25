import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    color: #3498db;
  }
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  min-width: 200px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  border-radius: 4px;
  padding: 0.5rem 0;
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 1000;
`;

const CategorySection = styled.div`
  padding: 0.5rem 0;

  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
`;

const CategoryTitle = styled.h3`
  padding: 0.5rem 1rem;
  color: #2c3e50;
  font-size: 0.9rem;
  font-weight: bold;
`;

const SubCategory = styled(Link)`
  display: block;
  padding: 0.5rem 1.5rem;
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    background-color: #f8f9fa;
    color: #3498db;
  }
`;

const categories = [
  {
    title: 'Одежда',
    items: ['Футболки', 'Джинсы', 'Куртки', 'Платья', 'Рубашки']
  },
  {
    title: 'Обувь',
    items: ['Кроссовки', 'Ботинки', 'Туфли', 'Сандалии']
  },
  {
    title: 'Аксессуары',
    items: ['Сумки', 'Часы', 'Ремни', 'Очки']
  }
];

const CategoryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownContainer 
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <DropdownButton>
        <i className="fas fa-th-large"></i>
        Категории
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
      </DropdownButton>

      <DropdownContent isOpen={isOpen}>
        {categories.map((category, index) => (
          <CategorySection key={index}>
            <CategoryTitle>{category.title}</CategoryTitle>
            {category.items.map((item, itemIndex) => (
              <SubCategory 
                key={itemIndex}
                to={`/category/${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
              >
                {item}
              </SubCategory>
            ))}
          </CategorySection>
        ))}
      </DropdownContent>
    </DropdownContainer>
  );
};

export default CategoryDropdown; 