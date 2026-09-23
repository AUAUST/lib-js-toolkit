import { defineConfig } from "vitest/config";
import { getCompileTimeVariables } from "./codegen/index.js";

const define = await getCompileTimeVariables();

export default defineConfig(({ mode }) => {
  // If vitest is ran with `--mode build`, the tests will be
  // run against the dist folder rather than the src folder.
  const shouldTestDist = mode === "build";

  const alias: Array<{ find: string | RegExp; replacement: string }> = [];

  if (!shouldTestDist) {
    alias.push(
      {
        find: /^@auaust\/toolkit$/,
        replacement: "/src/index.js",
      },
      {
        find: /^@auaust\/toolkit\/errors$/,
        replacement: "/src/errors.js",
      },
      {
        find: /^@auaust\/toolkit\/protocols$/,
        replacement: "/src/protocols/index.js",
      },
      {
        find: /^@auaust\/toolkit\/protocols\/(\w+)$/,
        replacement: "/src/protocols/$1/index.js",
      },
      {
        find: /^@auaust\/toolkit\/(\w+)$/,
        replacement: "/src/functions/$1.js",
      },
    );
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
