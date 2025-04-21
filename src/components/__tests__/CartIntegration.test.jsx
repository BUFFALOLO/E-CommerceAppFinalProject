import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../app/store';
import CreateProductForm from '../CreateProductForm';
import ShoppingCart from '../ShoppingCart';

describe('Cart Integration', () => {
  test('adds product and updates cart', async () => {
    render(
      <Provider store={store}>
        <CreateProductForm />
        <ShoppingCart />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Product' } });
    fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '25' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/Category/i), { target: { value: 'stickers' } });
    fireEvent.change(screen.getByLabelText(/Image URL/i), { target: { value: 'http://example.com/image.jpg' } });

    fireEvent.click(screen.getByRole('button', { name: /Create Product/i }));

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('$25.00')).toBeInTheDocument();
    });
  });
});
