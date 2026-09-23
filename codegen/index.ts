import { resolve } from "path";
import tsConfigContent from "../tsconfig.json";

// @ts-expect-error
import PackageJson from "@npmcli/package-json";
import { glob } from "fs/promises";

const root = process.cwd();

const packageJson = await PackageJson.load(root);

export function getPackageJsonContent() {
  return packageJson.content as typeof import("../package.json");
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
  /**
   * @auaust/toolkit/*
   */
  tsAlias: string;
  /**
   * ./src/*
   */
  tsPath: string;
  hasPattern: boolean;
  isIndex: boolean;
  /**
   * @auaust/toolkit -> ''
   * @auaust/toolkit/errors -> 'errors'
   * @auaust/toolkit/* -> '*'
   */
  entryName: string;
};

export const getResolvedAliases = (() => {
  let resolvedAliases: Alias[];

  return () =>
    (resolvedAliases ??= (() => {
      const { name: packageName } = getPackageJsonContent();

      const tsconfig = getTsConfigContent();

      const paths = tsconfig.compilerOptions.paths;

      const result: Alias[] = [];

      for (const [tsAlias, [tsPath]] of Object.entries(paths)) {
        const hasPattern = tsAlias.indexOf("*") !== -1;

        const isIndex = tsAlias === packageName;

        const entryName = isIndex
          ? "index"
          : tsAlias.replace(packageName, "").replace(/^\//, "");

        result.push({
          entryName,
          hasPattern,
          isIndex,
          tsAlias,
          tsPath,
        });
      }

      return result.sort((a, b) => {
        return Number(a.hasPattern) - Number(b.hasPattern);
      });
    })());
})();

export async function getTsupOptions() {
  const tsconfig = getTsConfigContent();

  const aliases = getResolvedAliases();

  const outDir = tsconfig.compilerOptions.outDir;

  const entry: Record<string, string> = Object.create(null);

  function set(entryName: string, fromRoot: string) {
    if (entryName in entry) {
      throw new Error(
        `Duplicate entry "${entryName}", ${fromRoot} and ${entry[entryName]}`,
      );
    }

    entry[entryName] = fromRoot;
  }

  for (const { hasPattern, tsPath, entryName } of aliases) {
    const fromRoot = resolveFromRoot(tsPath);

    if (!hasPattern) {
      set(entryName, fromRoot);
      continue;
    }

    for await (const { relative, entryName: starEntryName } of resolveStar(
      tsPath,
    )) {
      const resolvedEntryName = entryName.replace("*", starEntryName);

      set(resolvedEntryName, relative);
    }
  }

  return {
    outDir,
    entry,
  };
}

export function getViteDevAliases() {
  const aliases = getResolvedAliases();

  const alias: {
    find: RegExp | string;
    replacement: string;
  }[] = [];

  for (const { hasPattern, tsAlias, tsPath } of aliases) {
    if (!hasPattern) {
      alias.push({
        find: new RegExp(`^${tsAlias}$`),
        replacement: "/" + resolveFromRoot(tsPath).replace(/\.ts$/, ".js"),
      });
    } else {
      const resolved = resolveFromRoot(tsPath).replace(/\.ts$/, ".js");

      alias.push({
        find: tsAlias.slice(0, tsAlias.lastIndexOf("*") - 1),
        replacement: "/" + resolved.slice(0, resolved.lastIndexOf("*") - 1),
      });
    }
  }

  return alias;
}

export async function* resolveStar(alias: string) {
  const pattern = resolve(root, alias);

  const start = pattern.lastIndexOf("*");

  const endOffset = pattern.length - start - 1;

  for await (const filename of glob(pattern)) {
    const relative = resolveFromRoot(filename);

    const entryName = filename.slice(start, filename.length - endOffset);

    yield {
      filename,
      relative,
      entryName,
    };
  }
}

/**
 * Returns a path "absolute relative to the root" without the leading "./" or "/"
 * i.e. "./src/index.ts" becomes "src/index.ts"
 */
export function resolveFromRoot(...paths: string[]) {
  return resolve(root, ...paths).replace(new RegExp(`^${root}[\\/\\\\]?`), "");
}
