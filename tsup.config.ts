import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    arrays: "src/arrays/methods/index.ts",
    booleans: "src/booleans/methods/index.ts",
    functions: "src/functions/methods/index.ts",
    numbers: "src/numbers/methods/index.ts",
    objects: "src/objects/methods/index.ts",
    primitives: "src/primitives/methods/index.ts",
    strings: "src/strings/methods/index.ts",
  },
  format: ["esm", "cjs"],
  outDir: "dist",
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: false,
});
