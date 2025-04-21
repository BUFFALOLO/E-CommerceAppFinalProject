jest.mock('firebase/app', () => {
  return {
    initializeApp: jest.fn(() => ({})),
  };
});

jest.mock('firebase/auth', () => {
  return {
    getAuth: jest.fn(() => ({})),
  };
});

jest.mock('firebase/firestore', () => {
  return {
    getFirestore: jest.fn(() => ({})),
    collection: jest.fn(),
    addDoc: jest.fn(() => Promise.resolve()),
  };
});
