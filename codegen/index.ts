import { resolve } from "path";
import packageJsonContent from "../package.json" with { type: "json" };
import tsConfigContent from "../tsconfig.json" with { type: "json" };
import { pathRelativeFrom } from "./utils/pathResolveFrom";

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

type Alias = {
  alias: string;
  hasPattern: boolean;
  name: string;
  path: string;
};

export function getResolvedAliases() {
  const { name: packageName } = getPackageJsonContent();

  const {
    compilerOptions: { paths },
  } = getTsConfigContent();

  const result: Alias[] = [];

  for (const [alias, [tsPath]] of Object.entries(paths)) {
    const hasPattern = alias.indexOf("*") !== -1;

    const name =
      alias === packageName
        ? "index"
        : alias.replace(packageName, "").replace(/^\//, "");

    const path = resolveFromRoot(tsPath);

    result.push({
      name,
      path,
      hasPattern,
      alias,
    });
  }

  return result.sort((a, b) => {
    return Number(a.hasPattern) - Number(b.hasPattern);
  });
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
  const aliases = getResolvedAliases();

  const replacements: {
    find: RegExp | string;
    replacement: string;
  }[] = [];

  for (const { hasPattern, alias, path } of aliases) {
    if (!hasPattern) {
      replacements.push({
        find: new RegExp(`^${alias}$`),
        replacement: path,
      });
    } else {
      replacements.push({
        find: alias.slice(0, alias.lastIndexOf("*") - 1),
        replacement: path.slice(0, path.lastIndexOf("*") - 1),
      });
    }
  }

  return replacements;
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
