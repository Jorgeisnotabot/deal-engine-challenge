/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}], // Escaping "."
  },
  testMatch: ["**/test/**/*.test.ts", "**/test/**/*.ts"],
};