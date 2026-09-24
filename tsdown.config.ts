import { defineConfig } from "tsdown";
import { getTsdownOptions } from "./codegen/index.js";

export default defineConfig({
  ...getTsdownOptions(),
  dts: true,
  exports: {
    enabled: true,
    packageJson: false,
  },
  sourcemap: true,
  report: false,
  publint: true,
  attw: {
    enabled: true,
    profile: "node16",
    ignoreRules: ["cjs-resolves-to-esm"],
  },
  deps: { onlyBundle: [] },
});
