import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoritesItems: [],
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addItemToFavorites: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.favoritesItems.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.favoritesItems.push({ ...newItem, quantity: 1 });
      }
    },
    removeItemFromFavorites: (state, action) => {
      const itemToRemove = action.payload;
      state.favoritesItems = state.favoritesItems.filter((item) => item.id !== itemToRemove.id);
    },
  },
});

export const favoritesActions = favoriteSlice.actions;
export default favoriteSlice.reducer;
