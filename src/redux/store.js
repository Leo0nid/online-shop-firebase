import { configureStore } from '@reduxjs/toolkit';
import cart from '../redux/slices/cartSlice'; 
import favorites from '../redux/slices/favoritesSlice'; 
import search from '../redux/slices/searchSlice'; 

const store = configureStore({
  reducer: {
    cart,
    favorites,
    search,
  }
});

export default store;