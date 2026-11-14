import { defineEslintConfig } from "@auaust/engrenage/eslint";

export default defineEslintConfig({
  comparisons: {
    noRuntimeTypeof: false,
  },
});
