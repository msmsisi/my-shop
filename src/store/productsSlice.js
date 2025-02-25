import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialProducts = [
  {
    id: '1',
    name: 'Nike Air Max',
    price: 12990,
    category: 'sneakers',
    description: 'Классические кроссовки Nike Air Max с амортизирующей подошвой Air. Идеально подходят для повседневной носки.',
    image: 'https://picsum.photos/300/300?random=1',
    popularity: 5,
    reviews: []
  },
  {
    id: '2',
    name: 'Adidas Superstar',
    price: 9990,
    category: 'sneakers',
    description: 'Культовые кроссовки Adidas Superstar с узнаваемым дизайном и отличной поддержкой стопы.',
    image: 'https://picsum.photos/300/300?random=2',
    popularity: 4,
    reviews: []
  },
  {
    id: '3',
    name: 'Timberland Premium',
    price: 15990,
    category: 'boots',
    description: 'Водонепроницаемые ботинки Timberland Premium с прочной подошвой и кожаным верхом.',
    image: 'https://picsum.photos/300/300?random=3',
    popularity: 4,
    reviews: []
  },
  {
    id: '4',
    name: 'UGG Classic',
    price: 16990,
    category: 'boots',
    description: 'Классические угги из натуральной овчины с мягкой подошвой.',
    image: 'https://picsum.photos/300/300?random=4',
    popularity: 3,
    reviews: []
  }
];

const loadProducts = () => {
  const savedProducts = localStorage.getItem('products');
  return savedProducts ? JSON.parse(savedProducts) : initialProducts;
};

const saveProducts = (products) => {
  localStorage.setItem('products', JSON.stringify(products));
};

const initialState = {
  items: loadProducts(),
  categories: ['sneakers', 'boots', 'sandals', 'slippers'],
  cart: [],
  isAdmin: false,
  currentUser: null
};

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    ...initialState,
    isAdmin: false,
    currentUser: null
  },
  reducers: {
    addProduct: (state, action) => {
      const newProduct = {
        id: Date.now().toString(),
        ...action.payload,
        reviews: [],
        popularity: 0
      };
      state.items.push(newProduct);
      saveProducts(state.items);
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload,
          reviews: state.items[index].reviews
        };
        saveProducts(state.items);
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveProducts(state.items);
    },
    addReview: (state, action) => {
      const { productId, review } = action.payload;
      const product = state.items.find(item => item.id === productId);
      if (product) {
        product.reviews.push({
          ...review,
          id: Date.now().toString()
        });
        saveProducts(state.items);
      }
    },
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cart.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAdmin = action.payload?.isAdmin || false;
      console.log('User set:', action.payload);
      console.log('Is admin:', state.isAdmin);
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAdmin = false;
      localStorage.removeItem('currentUser');
    }
  }
});

export const { 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  addReview, 
  addToCart, 
  setCurrentUser,
  logout 
} = productsSlice.actions;

export const selectAllProducts = (state) => state.products.items;
export const selectProductById = (state, id) => 
  state.products.items.find(product => product.id === id);
export const selectProductsByCategory = (state, category) => 
  state.products.items.filter(product => product.category === category);
export const selectCategories = (state) => state.products.categories;

export const selectProducts = state => state.products.items;
export const selectCart = state => state.products.cart;

export const selectPopularProducts = createSelector(
  [selectProducts],
  (products) => [...products]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 4)
);

export const selectIsAdmin = state => state.products.isAdmin;
export const selectCurrentUser = state => state.products.currentUser;

export default productsSlice.reducer; 