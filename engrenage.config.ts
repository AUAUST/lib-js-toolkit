import { define, defineConfig } from "@auaust/engrenage/config";

export default defineConfig({
  presets: ["library"],
  define: {
    values({ packageJson }) {
      const { name, version, license } = packageJson.manifest;

      return {
        // @ts-expect-error
        __NAME__: define(name, {
          exact: true,
        }),
        // @ts-expect-error
        __VERSION__: define(version, {
          type: "`${number}.${number}.${number}`",
        }),
        // @ts-expect-error
        __LICENSE__: define(license),
      };
    },
  },
});
