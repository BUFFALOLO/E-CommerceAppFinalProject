import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CategoryDropdown from '../CategoryDropdown';

describe('CategoryDropdown Component', () => {
  const categories = ['All Categories', 'Stickers', 'Apparel'];

  test('renders dropdown with correct options', () => {
    render(<CategoryDropdown selectedCategory="" onCategoryChange={() => {}} />);
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(categories.length);
    categories.forEach((category, index) => {
      expect(options[index]).toHaveTextContent(category);
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
