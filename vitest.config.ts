import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => {
  // If vitest is ran with `--mode build`, the tests will be
  // run against the dist folder rather than the src folder.
  const shouldTestDist = mode === "build";

  const alias: { [key: string]: string } = {};

  if (!shouldTestDist) {
    alias["~"] = "/src";
    alias["@auaust/toolkit/protocol"] = "/src/protocols/index.ts";
    alias["@auaust/toolkit"] = "/src/index.ts";
  }

  return {
    resolve: {
      alias,
    },
    test: {
      coverage: {
        provider: "istanbul",
      },
    },
  };
});
