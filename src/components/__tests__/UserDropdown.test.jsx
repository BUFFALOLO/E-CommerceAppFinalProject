import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
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
    render(
      <MemoryRouter>
        <UserDropdown currentUser={currentUser} />
      </MemoryRouter>
    );
    expect(screen.getByRole('button', { name: /user/i })).toBeInTheDocument();
    const toggleButton = screen.getByRole('button', { name: /user/i });
    fireEvent.click(toggleButton);
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
    expect(screen.getByText(currentUser.displayName)).toBeInTheDocument();
    expect(screen.getByText(currentUser.email)).toBeInTheDocument();
  });

  test('toggles dropdown visibility on toggle event', () => {
    render(
      <MemoryRouter>
        <UserDropdown currentUser={currentUser} />
      </MemoryRouter>
    );
    const toggleButton = screen.getByRole('button', { name: /user/i });
    fireEvent.click(toggleButton);
    expect(screen.getByText(/profile/i)).toBeVisible();
  });

  test('calls signOut on clicking logout', () => {
    render(
      <MemoryRouter>
        <UserDropdown currentUser={currentUser} />
      </MemoryRouter>
    );
    const toggleButton = screen.getByRole('button', { name: /user/i });
    fireEvent.click(toggleButton);
    const logoutItem = screen.getByText(/logout/i);
    fireEvent.click(logoutItem);
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
