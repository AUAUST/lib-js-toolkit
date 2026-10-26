import { defineTsdownConfig } from "@auaust/engrenage/tsdown";

import { getCompileTimeVariables } from "./codegen/index.js";

export default defineTsdownConfig(null, (_1, _2, config) => {
  return {
    define: getCompileTimeVariables(config),
  };
});
