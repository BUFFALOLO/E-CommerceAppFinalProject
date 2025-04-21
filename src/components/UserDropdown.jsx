import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'; 
import Dropdown from 'react-bootstrap/Dropdown';

const UserDropdown = ({ currentUser }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const email = currentUser?.email;
  const displayName = currentUser?.displayName;

  return (
    <Dropdown onToggle={() => setShowDropdown(!showDropdown)} show={showDropdown}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        User
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as={NavLink} to="/profile">Profile</Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
      <div>
        <p>{displayName}</p>
        <p>{email}</p>
      </div>
    </Dropdown>
  );
};

export default UserDropdown;
