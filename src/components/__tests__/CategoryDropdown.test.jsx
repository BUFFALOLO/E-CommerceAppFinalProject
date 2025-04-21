import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CategoryDropdown from '../CategoryDropdown';

describe('CategoryDropdown Component', () => {
  const categories = ['stickers', 'apparel'];

  test('renders dropdown with correct options', () => {
    render(<CategoryDropdown selectedCategory="" onCategoryChange={() => {}} />);
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(categories.length + 1); // including "All Categories"
    expect(options[0].textContent).toBe('All Categories');
    categories.forEach((category, index) => {
      expect(options[index + 1].textContent).toBe(category.charAt(0).toUpperCase() + category.slice(1));
    });
  });

  test('calls onCategoryChange when selection changes', () => {
    const onCategoryChangeMock = jest.fn();
    render(<CategoryDropdown selectedCategory="" onCategoryChange={onCategoryChangeMock} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'stickers' } });
    expect(onCategoryChangeMock).toHaveBeenCalledWith('stickers');
  });
});
