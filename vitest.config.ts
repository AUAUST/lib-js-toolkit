import { defineVitestConfig } from "@auaust/engrenage/vitest";

import { getCompileTimeVariables } from "./src/build.js";

export default defineVitestConfig(null, (_, config) => {
  return {
    define: getCompileTimeVariables(config),
  };
});
