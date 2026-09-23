import { defineConfig } from "tsup";
import { getCompileTimeVariables, getTsupOptions } from "./codegen";

const { outDir, entry } = await getTsupOptions();

const define = getCompileTimeVariables();

export default defineConfig(() => {
  return {
    outDir,
    entry,
    format: ["esm", "cjs"],
    dts: true,
    splitting: true,
    sourcemap: true,
    clean: true,
    define,
  };
});
