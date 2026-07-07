export default {
  testEnvironment: "node",
  transform: {},
  testMatch: ["**/tests/**/*.test.js"],
  // Use Jest's own file crawler instead of Watchman, which litters the
  // project with .watchman-cookie-* files.
  watchman: false,
};
