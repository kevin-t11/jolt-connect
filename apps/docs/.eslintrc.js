/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@jolt-connect/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["next.config.mjs"],
  parserOptions: {
    project: true,
  },
};
