import { createSlice } from '@reduxjs/toolkit';

const loadCartFromSessionStorage = () => {
  try {
    const serializedCart = sessionStorage.getItem('cart');
    if (serializedCart === null) {
      return { items: [] };
    }
    const parsedCart = JSON.parse(serializedCart);
    // Filter out invalid items missing id, title, or price
    if (parsedCart.items && Array.isArray(parsedCart.items)) {
      parsedCart.items = parsedCart.items.filter(item =>
        item.id && item.title && typeof item.price === 'number'
      );
    } else {
      parsedCart.items = [];
    }
    return parsedCart;
  } catch (e) {
    console.warn('Failed to load cart from sessionStorage:', e);
    return { items: [] };
  }
};

const initialState = loadCartFromSessionStorage();

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const payload = action.payload;
      // Validate payload has id, title, and price
      if (!payload.id || !payload.title || typeof payload.price !== 'number') {
        console.warn('Invalid product payload for addItem:', payload);
        return;
      }
      const existingItem = state.items.find(
        item => item.id === payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...payload, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => 
  state.cart.items.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

export default cartSlice.reducer;
