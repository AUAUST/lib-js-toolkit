import { globSync } from "node:fs";
import { relative, resolve } from "node:path";

type Alias = {
  alias: string;
  name: string;
  path: string;
};

export function resolveAliases(
  packageName: string,
  paths: Record<string, readonly string[]>,
  root: string,
): Alias[] {
  const aliases = new Map<string, Alias>();
  const entries = new Map<string, string>();

  for (const [aliasPattern, targets] of Object.entries(paths)) {
    const hasPattern = aliasPattern.includes("*");
    let matched = false;

    if (targets.length === 0) {
      throw new Error(`Alias '${aliasPattern}' has no configured paths`);
    }

    for (const target of targets) {
      const pattern = relative(root, resolve(root, target)).replaceAll(
        "\\",
        "/",
      );

      const wildcard = pattern.indexOf("*");

      const prefix = pattern.slice(0, wildcard);

      const suffix = pattern.slice(wildcard + 1);

      const files = globSync(pattern, {
        cwd: root,
      }).sort();

      for (const file of files) {
        const path = file.replaceAll("\\", "/");

        const capture = path.slice(prefix.length, path.length - suffix.length);

        const alias = hasPattern
          ? aliasPattern.replace("*", capture)
          : aliasPattern;

        const previous = aliases.get(alias);

        if (previous) {
          throw new Error(
            `Alias conflict for '${alias}': '${previous.path}' and '${path}'`,
          );
        }

        const publicName =
          alias === packageName ? "index" : alias.slice(packageName.length + 1);

        const isDirectoryEntry = hasPattern && pattern.endsWith("*/index.ts");

        const name = isDirectoryEntry ? `${publicName}/index` : publicName;

        const previousEntry = entries.get(name);

        if (previousEntry) {
          throw new Error(
            `Entrypoint conflict for '${name}': '${previousEntry}' and '${path}'`,
          );
        }

        entries.set(name, path);

        aliases.set(alias, {
          alias,
          name,
          path,
        });

        matched = true;
      }
    }

    if (!hasPattern && !matched) {
      throw new Error(`Alias '${aliasPattern}' does not resolve to a file`);
    }
  }

  return [...aliases.values()];
}
