import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductForm from '../CreateProductForm';

// Mock the Firestore addDoc function to avoid actual database calls
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  addDoc: jest.fn(() => Promise.resolve()),
}));

describe('ProductForm Component', () => {
  test('renders form fields with initial state', () => {
    render(<ProductForm />);
    expect(screen.getByLabelText(/Product Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Product Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Image URL/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Product/i })).toBeInTheDocument();
  });

  test('updates state and shows success message on valid form submission', async () => {
    render(<ProductForm />);
    const titleInput = screen.getByLabelText(/Product Title/i);
    const priceInput = screen.getByLabelText(/Product Price/i);
    const descriptionInput = screen.getByLabelText(/Description/i);
    const imageInput = screen.getByLabelText(/Image URL/i);
    const submitButton = screen.getByRole('button', { name: /Create Product/i });

    fireEvent.change(titleInput, { target: { value: 'Test Product' } });
    fireEvent.change(priceInput, { target: { value: '19.99' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test description' } });
    fireEvent.change(imageInput, { target: { value: 'http://example.com/image.jpg' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Product created successfully!/i)).toBeInTheDocument();
    });

    // After submission, inputs should be reset
    expect(titleInput.value).toBe('');
    expect(priceInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
    expect(imageInput.value).toBe('');
  });

  test('shows error message on invalid form submission', async () => {
    render(<ProductForm />);
    const submitButton = screen.getByRole('button', { name: /Create Product/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/All fields must be filled out correctly./i)).toBeInTheDocument();
    });
  });
});
