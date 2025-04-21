import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, deleteUser as firebaseDeleteUser } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserProfile(userDocSnap.data());
        } else {
          const profileData = {
            email: user.email,
            createdAt: new Date(),
          };
          await setDoc(userDocRef, profileData);
          setUserProfile(profileData);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const updateUserProfile = async (updatedData) => {
    if (!currentUser) throw new Error('No user logged in');
    const userDocRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userDocRef, updatedData);
    setUserProfile((prev) => ({ ...prev, ...updatedData }));
  };

  const deleteUserProfile = async () => {
    if (!currentUser) throw new Error('No user logged in');
    const userDocRef = doc(db, 'users', currentUser.uid);
    await deleteDoc(userDocRef);
    setUserProfile(null);
  };

  const deleteUserAccount = async () => {
    if (!currentUser) throw new Error('No user logged in');
    await deleteUserProfile();
    await firebaseDeleteUser(currentUser);
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    userProfile,
    updateUserProfile,
    deleteUserProfile,
    deleteUserAccount,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
