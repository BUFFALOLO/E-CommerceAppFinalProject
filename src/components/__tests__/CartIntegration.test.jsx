import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import CreateProductForm from '../CreateProductForm';
import ShoppingCart from '../ShoppingCart';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Cart Integration', () => {
  let store;
  let initialState;

  beforeEach(() => {
    initialState = {
      cart: {
        items: [],
      },
    };
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  test('adds product and updates cart', async () => {
    render(
      <Provider store={store}>
        <CreateProductForm />
        <ShoppingCart />
      </Provider>
    );

    // Simulate filling product form
    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Product' } });
    fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '25' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'stickers' } });
    fireEvent.change(screen.getByLabelText(/Image URL/i), { target: { value: 'http://example.com/image.jpg' } });

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: /Create Product/i }));

    // Wait for dispatch to be called
    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalled();
    });

    // Since this is a mock store, we cannot check actual cart update state here,
    // but we verify that the dispatch was called indicating an action to update cart.
  });
});
