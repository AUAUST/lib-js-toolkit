import { defineConfig } from "tsup";
import { getCompileTimeVariables } from "./codegen";

const define = await getCompileTimeVariables();

export default defineConfig(() => {
  return {
    entry: {
      index: "src/index.ts",
      protocols: "src/protocols/index.ts",
    },
    format: ["esm", "cjs"],
    outDir: "dist",
    dts: true,
    splitting: true,
    sourcemap: true,
    clean: true,
    define,
  };
});
