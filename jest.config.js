export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transformIgnorePatterns: [
    '/node_modules/(?!firebase|@firebase)/', // Transform firebase modules as well
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js', // Mock image imports
    '^firebase/firestore$': '<rootDir>/src/__mocks__/firebase/firestore.js',
    '^firebase/auth$': '<rootDir>/src/__mocks__/firebase/auth.js'
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
};
