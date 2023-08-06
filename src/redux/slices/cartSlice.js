import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity++; 
        
      } else {
        state.cartItems.push({ ...newItem, quantity: 1 }); 
      }
    },

    removeItemFromCart: (state, action) => {
      const itemToRemove = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemToRemove.id);
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
