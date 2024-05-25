module.exports = {
  globalTeardown: "./src/tests/teardown.ts",
  testMatch: ["**/tests/**/*.test.ts"],
  testTimeout: 30000,
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  clearMocks: true,
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },

  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },

  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,js}",
    "!src/**/*.d.ts",
    "!**/*.test.ts",
    "!**/*.spec.ts",
    "!**/node_modules/**",
    "!**/.eslintrc.js",
  ],
  coverageReporters: ["text", "html"],
};
