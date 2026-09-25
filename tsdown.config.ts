import { readFile } from "node:fs/promises";
import { defineConfig } from "tsdown";
import { getTsdownOptions } from "./codegen/index.js";
import initialPackageJson from "./package.json" with { type: "json" };

const packageJsonUrl = new URL("./package.json", import.meta.url);

export default defineConfig((_, { ci }) => ({
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
  failOnWarn: ci,
  hooks: {
    "build:done"() {
      if (ci) {
        return readFile(packageJsonUrl, "utf8").then((content) => {
          if (
            JSON.stringify(initialPackageJson) !==
            JSON.stringify(JSON.parse(content))
          ) {
            throw new Error("package.json is not up to date");
          }
        });
      }
    },
  },
  minify: ci,
}));
