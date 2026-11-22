module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/tests/**/*.test.{js,jsx}'],
  setupFilesAfterEnv: ['<rootDir>/tests/config/setupTests.js'],
  moduleNameMapper: { '\\.(css)$': '<rootDir>/tests/config/styleMock.js' },
};
