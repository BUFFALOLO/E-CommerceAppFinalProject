import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer
  }
});


store.subscribe(() => {
  try {
    const state = store.getState();
    const serializedCart = JSON.stringify(state.cart);
    sessionStorage.setItem('cart', serializedCart);
  } catch (e) {
    console.warn('Failed to save cart to sessionStorage:', e);
  }
});
