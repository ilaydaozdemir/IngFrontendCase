import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  testTimeout: 10000,
  plugins: [nodeResolve()],

  files: ["tests/**/*.test.js"],
  nodeResolve: true,
};
