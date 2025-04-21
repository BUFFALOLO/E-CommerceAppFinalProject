import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CategoryDropdown from '../CategoryDropdown';

describe('CategoryDropdown Component', () => {
  test('renders dropdown and selects category', () => {
    render(<CategoryDropdown />);
    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toBeInTheDocument();

    fireEvent.change(dropdown, { target: { value: 'electronics' } });
    expect(dropdown.value).toBe('electronics');
  });
});
