import { define, defineConfig } from "@auaust/engrenage/config";

export default defineConfig({
  presets: ["library"],
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
});
