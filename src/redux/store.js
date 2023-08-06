import { configureStore } from '@reduxjs/toolkit';
import cart from '../redux/slices/cartSlice'; 

const store = configureStore({
  reducer: {
    cart
  }
});

export default store;