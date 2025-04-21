import React from 'react';
import { render, screen } from '@testing-library/react';
import OrderProcessing from '../OrderProcessing';

describe('OrderProcessing Component', () => {
  test('renders heading', () => {
    render(<OrderProcessing />);
    expect(screen.getByText('Order Processing')).toBeInTheDocument();
  });
});
