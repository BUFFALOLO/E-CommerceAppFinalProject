import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddDataForm from '../AddDataForm';
import { addDoc } from 'firebase/firestore';

jest.mock('../../firebase', () => ({
  auth: {},
  db: {},
}));

jest.mock('firebase/firestore', () => ({
  addDoc: jest.fn(),
  collection: jest.fn(),
}));

describe('AddDataForm', () => {
  beforeAll(() => {
    window.alert = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form inputs and submit button', () => {
    render(<AddDataForm />);
    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/age/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add user/i })).toBeInTheDocument();
  });

  test('updates state on input change', () => {
    render(<AddDataForm />);
    const nameInput = screen.getByPlaceholderText(/name/i);
    const ageInput = screen.getByPlaceholderText(/age/i);

    fireEvent.change(nameInput, { target: { value: 'John' } });
    expect(nameInput).toHaveValue('John');

    fireEvent.change(ageInput, { target: { value: '30' } });
    expect(ageInput).toHaveValue(30);
  });

  test('submits form and resets inputs', async () => {
    (addDoc as jest.Mock).mockResolvedValueOnce({});

    render(<AddDataForm />);
    const nameInput = screen.getByPlaceholderText(/name/i);
    const ageInput = screen.getByPlaceholderText(/age/i);
    const submitButton = screen.getByRole('button', { name: /add user/i });

    fireEvent.change(nameInput, { target: { value: 'Alice' } });
    fireEvent.change(ageInput, { target: { value: '25' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(addDoc).toHaveBeenCalledTimes(1);
      expect(nameInput).toHaveValue('');
      expect(ageInput).toHaveValue(0);
    });
  });
});
