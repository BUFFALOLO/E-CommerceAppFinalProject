import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import cartReducer, { addItem } from '../../features/cart/cartSlice';
import ShoppingCart from '../ShoppingCart';

// Mock useAuth hook
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    currentUser: { uid: 'test-uid', email: 'test@example.com' },
    userProfile: { name: 'Test User' }
  }),
}));

// Mock firebase/firestore
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  serverTimestamp: jest.fn(() => new Date()),
}));

describe('ShoppingCart Integration Test', () => {
  let store;
  let component;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        cart: cartReducer,
      },
      preloadedState: {
        cart: {
          items: []
        }
      }
    });

    component = render(
      <Provider store={store}>
        <MemoryRouter>
          <ShoppingCart />
        </MemoryRouter>
      </Provider>
    );
  });

  test('updates cart when adding a product', () => {
    // Initially cart is empty
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();

    // Dispatch addItem action to simulate adding a product
    const product = {
      id: '1',
      title: 'Test Product',
      price: 10,
      image: 'test-image.jpg'
    };
    act(() => {
      store.dispatch(addItem(product));
    });

    // Re-render component with updated store state
    component.rerender(
      <Provider store={store}>
        <MemoryRouter>
          <ShoppingCart />
        </MemoryRouter>
      </Provider>
    );

    // Assert the product is displayed in the cart
    expect(screen.getAllByText(product.title).length).toBeGreaterThan(0);
    expect(screen.getByText('$10')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
  });
});
