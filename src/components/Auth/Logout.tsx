import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

function Logout() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
