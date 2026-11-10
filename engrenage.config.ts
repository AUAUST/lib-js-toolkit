import { define, defineConfig } from "@auaust/engrenage/config";

export default defineConfig({
  preset: "library",
  visibility: "private",
  agents: {
    preferred: ["claude", "codex"],
    attribution: false,
  },
  define: {
    values({ packageJson: { name, version, license } }) {
      return {
        __NAME__: define(name, {
          exact: true,
        }),
        __VERSION__: define(version, {
          type: "`${number}.${number}.${number}`",
        }),
        __LICENSE__: license,
      };
    },
  },
  src: {
    baseline: "2026-10",
    apis: ["timers", "performance", "console", "disposable", "float16"],
    exports: {
      "./types": "./src/types/index.ts",
      "./errors": "./src/errors/index.ts",
      "./*": "./src/modules/*/index.ts",
      ".": "./src/index.ts",
    },
  },
});
