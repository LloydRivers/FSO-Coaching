module.exports = {
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
};
