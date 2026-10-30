import { define, defineConfig } from "@auaust/engrenage/config";

export default defineConfig({
  presets: ["library"],
  agents: {
    preferred: ["claude", "codex"],
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
  code: {
    generatedFiles: ["AGENTS.override.md"],
  },
});
