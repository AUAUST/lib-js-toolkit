import { defineConfig } from "vitest/config";
import { getCompileTimeVariables, getViteDevAliases } from "./codegen/index.js";

const define = getCompileTimeVariables();

export default defineConfig(({ mode }) => {
  // If vitest is ran with `--mode build`, the tests will be
  // run against the dist folder rather than the src folder.
  const shouldTestDist = mode === "build";

  const alias: Array<{ find: string | RegExp; replacement: string }> = [];

  if (!shouldTestDist) {
    alias.push(...getViteDevAliases());
  }

  return {
    resolve: {
      alias,
    },
    define,
    test: {
      coverage: {
        provider: "istanbul",
      },
    },
  };
});
