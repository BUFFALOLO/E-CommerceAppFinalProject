import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import CreateCustomerForm from '../CreateCustomerForm';

jest.mock('axios');

describe('CreateCustomerForm Component', () => {
  beforeEach(() => {
    axios.post.mockClear();
  });

  test('renders form fields', () => {
    render(<CreateCustomerForm />);
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
  });

  test('shows validation error when required fields are empty', async () => {
    render(<CreateCustomerForm />);
    fireEvent.click(screen.getByRole('button', { name: /Create Customer/i }));
    expect(await screen.findByText(/All fields must be filled out correctly/i)).toBeInTheDocument();
  });

  test('shows success message on successful submission', async () => {
    axios.post.mockResolvedValue({ data: {} });
    render(<CreateCustomerForm />);
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'User' } });
    fireEvent.click(screen.getByRole('button', { name: /Create Customer/i }));
    await waitFor(() => {
      expect(screen.getByText(/Customer created successfully!/i)).toBeInTheDocument();
    });
  });
});
