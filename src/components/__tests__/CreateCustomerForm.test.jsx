import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateCustomerForm from '../CreateCustomerForm';
import axios from 'axios';

jest.mock('axios');

describe('CreateCustomerForm Component', () => {
  beforeEach(() => {
    axios.post.mockClear();
  });

  test('renders form fields and submit button', () => {
    render(<CreateCustomerForm />);
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Customer/i })).toBeInTheDocument();
  });

  test('updates state on input change', () => {
    render(<CreateCustomerForm />);
    const usernameInput = screen.getByLabelText(/Username/i);
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    expect(usernameInput.value).toBe('testuser');
  });

  test('shows success message on successful form submission', async () => {
    axios.post.mockResolvedValueOnce({ data: {} });
    render(<CreateCustomerForm />);
    const usernameInput = screen.getByLabelText(/Username/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const submitButton = screen.getByRole('button', { name: /Create Customer/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(firstNameInput, { target: { value: 'Test' } });
    fireEvent.change(lastNameInput, { target: { value: 'User' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Customer created successfully!/i)).toBeInTheDocument();
    });
  });

  test('shows error message on failed form submission', async () => {
    axios.post.mockRejectedValueOnce(new Error('Failed to create'));
    render(<CreateCustomerForm />);
    const usernameInput = screen.getByLabelText(/Username/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const submitButton = screen.getByRole('button', { name: /Create Customer/i });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(firstNameInput, { target: { value: 'Test' } });
    fireEvent.change(lastNameInput, { target: { value: 'User' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Error creating customer/i)).toBeInTheDocument();
    });
  });
});
