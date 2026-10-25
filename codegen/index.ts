import { resolvePathAliases } from "@auaust/engrenage/typescript";
import { createViteAliases } from "@auaust/engrenage/vite";
import { resolve } from "path";
import packageJsonContent from "../package.json" with { type: "json" };
import tsConfigContent from "../tsconfig.json" with { type: "json" };
import { pathRelativeFrom } from "./utils/pathResolveFrom.js";

const root = process.cwd();

export function getPackageJsonContent() {
  return packageJsonContent;
}

export function getTsConfigContent() {
  return tsConfigContent;
}

export function getCompileTimeVariables(): Record<string, string> {
  const packagejson = getPackageJsonContent();

  const variables = {
    __NAME__: packagejson.name,
    __VERSION__: packagejson.version,
    __LICENSE__: packagejson.license,
    __TIMESTAMP__: new Date().toISOString(),
  };

  return Object.fromEntries(
    Object.entries(variables).map(([key, value]) => [
      key,
      JSON.stringify(value),
    ]),
  );
}

export function getResolvedAliases() {
  const { name: packageName } = getPackageJsonContent();

  const {
    compilerOptions: { paths },
  } = getTsConfigContent();

  return resolvePathAliases(packageName, paths, root);
}

export function getTsdownOptions() {
  const aliases = getResolvedAliases();

  const entry: Record<string, string> = Object.create(null);

  for (const { name: entryName, path: fromRoot } of aliases) {
    entry[entryName] = fromRoot;
  }

  return {
    entry,
    outDir: getOutDir(),
    define: getCompileTimeVariables(),
  };
}

export function getViteDevAliases() {
  return createViteAliases(getResolvedAliases(), root);
}

export function getOutDir(absolute = false) {
  const {
    compilerOptions: { outDir },
  } = getTsConfigContent();

  return absolute ? resolve(root, outDir) : resolveFromRoot(outDir);
}

export function resolveFromRoot(...paths: string[]) {
  return pathRelativeFrom(root, ...paths);
}
