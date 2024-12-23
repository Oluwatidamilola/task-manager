export default {
  testEnvironment: "node", // Use Node.js environment
  modulePathIgnorePatterns: ["<rootDir>/frontend", "<rootDir>/task-manager"], // Ignore unnecessary directories
  testMatch: ["<rootDir>/tests/**/*.test.mjs"], // Match `.test.mjs` files
  transform: {}, // No transformation needed for native ESM
};
