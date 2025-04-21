import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import PropTypes from 'prop-types';

const UserProfile = () => {
  const { currentUser, userProfile, updateUserProfile, deleteUserAccount } = useAuth();
  const [displayName, setDisplayName] = useState(userProfile?.displayName || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (userProfile) {
      setDisplayName(userProfile.displayName || '');
    }
  }, [userProfile]);

  const handleUpdate = async () => {
    try {
      await updateUserProfile({ displayName });
      alert('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        await deleteUserAccount();
        alert('Account deleted successfully!');
      } catch (err) {
        setError('Failed to delete account. Please try again.');
      }
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      {error && <p className="text-danger">{error}</p>}
      <p>Email: {userProfile?.email}</p>
<p>Display Name: {userProfile?.displayName}</p>
      <div>
        <label>
          Display Name:
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <button onClick={handleUpdate}>Update</button>
      </div>
      <button onClick={handleDeleteAccount} className="btn btn-danger">
        Delete Account
      </button>
    </div>
  );
};

UserProfile.propTypes = {
  currentUser: PropTypes.object,
  userProfile: PropTypes.object,
  updateUserProfile: PropTypes.func,
  deleteUserAccount: PropTypes.func,
};

export default UserProfile;
