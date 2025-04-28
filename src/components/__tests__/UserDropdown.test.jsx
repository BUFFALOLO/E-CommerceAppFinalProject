import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserDropdown from '../UserDropdown';
import { signOut } from 'firebase/auth';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({})),
  signOut: jest.fn(),
}));

describe('UserDropdown', () => {
  const currentUser = {
    email: 'test@example.com',
    displayName: 'Test User',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders dropdown toggle and menu items', () => {
    render(<UserDropdown currentUser={currentUser} />);
    expect(screen.getByRole('button', { name: /user/i })).toBeInTheDocument();
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
    expect(screen.getByText(currentUser.displayName)).toBeInTheDocument();
    expect(screen.getByText(currentUser.email)).toBeInTheDocument();
  });

  test('toggles dropdown visibility on toggle event', () => {
    render(<UserDropdown currentUser={currentUser} />);
    const toggleButton = screen.getByRole('button', { name: /user/i });
    fireEvent.click(toggleButton);
    // The dropdown menu should be visible after toggle
    expect(screen.getByText(/profile/i)).toBeVisible();
  });

  test('calls signOut on clicking logout', () => {
    render(<UserDropdown currentUser={currentUser} />);
    const toggleButton = screen.getByRole('button', { name: /user/i });
    fireEvent.click(toggleButton);
    const logoutItem = screen.getByText(/logout/i);
    fireEvent.click(logoutItem);
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
