import React from 'react';
import { render, screen } from '@testing-library/react';
import OrderProcessing from '../OrderProcessing';

describe('OrderProcessing Component', () => {
  test('renders heading and paragraph', () => {
    render(<OrderProcessing />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Order Processing');
    expect(screen.getByText('This is the Order Processing page.')).toBeInTheDocument();
  });
});
