// import nextJest from 'next/jest'
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  setupFiles: ['jest-canvas-mock'],
  testEnvironment: 'jsdom',
  collectCoverage: false,
  preset: 'ts-jest',
  // Add transform configuration for TypeScript files
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
  coveragePathIgnorePatterns: [
    '/react-query/',
    '/public/',
    '/api/',
    '/node_modules/',
    '/features/Report/',
    '/npm/',
    '/constants/',
    '/utils/',
    '/context/',
    '/assets/',
    '/schemas/',
    '/axiosInstance/',
    '/components/',
    '/app/'
  ]
};

// createJestConfig is exported this way to enrsure that next/jest can load the Next.js config which is async
module.exports = async () => {
  const jestConfig = await createJestConfig(config)();
  jestConfig.transformIgnorePatterns.push('/node_modules/(?!@mui/)');
  return jestConfig;
};
