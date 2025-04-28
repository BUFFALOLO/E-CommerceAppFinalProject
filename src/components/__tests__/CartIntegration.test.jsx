import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ShoppingCart from '../ShoppingCart';
import { addItem } from '../../features/cart/cartSlice';

const mockStore = configureStore([]);

describe('ShoppingCart Integration Test', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cart: {
        items: []
      }
    });

    // Mock dispatch to update the store state
    store.dispatch = jest.fn((action) => {
      if (action.type === addItem.type) {
        const existingItem = store.getState().cart.items.find(item => item.id === action.payload.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          store.getState().cart.items.push({ ...action.payload, quantity: 1 });
        }
      }
      return action;
    });
  });

  test('updates cart when adding a product', () => {
    render(
      <Provider store={store}>
        <ShoppingCart />
      </Provider>
    );

    // Initially cart is empty
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();

    // Dispatch addItem action to simulate adding a product
    const product = {
      id: '1',
      title: 'Test Product',
      price: 10,
      image: 'test-image.jpg'
    };
    store.dispatch(addItem(product));

    // Re-render component with updated store state
    render(
      <Provider store={store}>
        <ShoppingCart />
      </Provider>
    );

    // Assert the product is displayed in the cart
    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText('$10')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
  });
});
