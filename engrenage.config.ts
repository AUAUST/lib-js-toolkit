import { define, defineConfig } from "@auaust/engrenage/config";

export default defineConfig({
  presets: ["library"],
  define: {
    values({ packageJson }) {
      const { name, version, license } = packageJson.manifest;

      return {
        __NAME__: define(name, {
          exact: true,
        }),
        __VERSION__: define(version, {
          type: "`${number}.${number}.${number}`",
        }),
        __LICENSE__: define(license),
      };
    },
  },
});
