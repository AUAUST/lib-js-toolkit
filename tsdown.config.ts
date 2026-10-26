import { defineTsdownConfig } from "@auaust/engrenage/tsdown";

import { getCompileTimeVariables } from "./src/build.js";

export default defineTsdownConfig(null, (_1, _2, config) => {
  return {
    define: getCompileTimeVariables(config),
  };
});
