import { configureStore } from '@reduxjs/toolkit';
import cart from '../redux/slices/cartSlice'; 
import favorites from '../redux/slices/favoritesSlice'; 

const store = configureStore({
  reducer: {
    cart,
    favorites,
  }
});

export default store;