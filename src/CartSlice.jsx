// CartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Function to load cart items from local storage
const loadCartItems = () => {
  const savedItems = localStorage.getItem('cartItems');
  return savedItems ? JSON.parse(savedItems) : [];
};

// Function to save cart items to local storage
const saveCartItems = (items) => {
  localStorage.setItem('cartItems', JSON.stringify(items));
};

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartItems(), // Load initial cart items from local storage
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
      saveCartItems(state.items); // Save updated items to local storage
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
      saveCartItems(state.items); // Save updated items to local storage
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
      saveCartItems(state.items); // Save updated items to local storage
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
