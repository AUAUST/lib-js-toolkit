import { defineEslintConfig } from "@auaust/engrenage/eslint";

export default defineEslintConfig({
  globals: {
    noArrayIsArray: false,
    noObjectStatics: false,
    noMathStatics: false,
  },
  comparisons: {
    noRuntimeTypeof: false,
  },
});
