import { defineVitestConfig } from "@auaust/engrenage/vitest";

import { getCompileTimeVariables } from "./codegen";

export default defineVitestConfig(null, (_, config) => {
  return {
    define: getCompileTimeVariables(config),
  };
});
