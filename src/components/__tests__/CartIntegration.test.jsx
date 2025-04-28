import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import cartReducer, { addItem } from '../../features/cart/cartSlice';
import ShoppingCart from '../ShoppingCart';

jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    currentUser: { uid: 'test-uid', email: 'test@example.com' },
    userProfile: { name: 'Test User' }
  }),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({})),
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
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();

    const product = {
      id: '1',
      title: 'Test Product',
      price: 10,
      image: 'test-image.jpg'
    };
    act(() => {
      store.dispatch(addItem(product));
    });

    component.rerender(
      <Provider store={store}>
        <MemoryRouter>
          <ShoppingCart />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText(product.title).length).toBeGreaterThan(0);
    expect(screen.getByText('$10')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
  });
});
