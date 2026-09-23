import { defineConfig } from "vitest/config";
import { getCompileTimeVariables } from "./codegen/index.js";

const define = await getCompileTimeVariables();

export default defineConfig(({ mode }) => {
  // If vitest is ran with `--mode build`, the tests will be
  // run against the dist folder rather than the src folder.
  const shouldTestDist = mode === "build";

  const alias: { [key: string]: string } = {};

  if (!shouldTestDist) {
    alias["~"] = "/src";
    alias["@auaust/toolkit"] = "/src";
    alias["@auaust/toolkit/protocols"] = "/src/protocols";
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
