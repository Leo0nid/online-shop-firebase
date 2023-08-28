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

    changeItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.cartItems.find(item => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
