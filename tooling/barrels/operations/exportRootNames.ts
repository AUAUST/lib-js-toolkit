import type {
  BarrelExport,
  LoadedConfig,
  StructureNode,
} from "@auaust/engrenage/extensions";

import { listModules } from "#tooling/barrels/operations/listModules";
import { listModuleUtils } from "#tooling/barrels/operations/listModuleUtils";
import { readJsdocTags } from "#tooling/barrels/operations/readJsdocTags";
import { lowerFirst } from "#tooling/barrels/utils/lowerFirst";
import { parseShorthands } from "#tooling/barrels/utils/parseShorthands";
import { splitPrefix } from "#tooling/barrels/utils/splitPrefix";

async function listModuleRootExports(
  config: LoadedConfig,
  module: StructureNode,
): Promise<BarrelExport[]> {
  const helpers = await listModuleUtils(config, module, "");

  const exported = await Promise.all(
    helpers.map(async ({ file, binding }) => {
      const split = splitPrefix(binding, ["to", "assert", "ensure"]);

      const converter = (
        split?.prefix === "to" && lowerFirst(split.type) === module.name
      );

      const variant = split != null && split.prefix === module.name;

      const tags = await readJsdocTags(config, file, binding);

      if (!converter && !variant && !tags.has("root")) {
        return [];
      }

      const shorthands = converter ? parseShorthands(tags, file, binding) : [];

      return [
        { file, binding },
        ...shorthands.map((name) => {
          return {
            file,
            binding,
            name,
          };
        }),
      ];
    }),
  );

  return exported.flat();
}

/**
 * Adds to the root `domains` block each converter with its shorthands, each `assert<Type>` and `ensure<Type>`,
 * and each helper tagged `@root`, under their own names.
 */
export async function exportRootNames(
  node: StructureNode,
  exports: readonly BarrelExport[],
  config: LoadedConfig,
): Promise<readonly BarrelExport[]> {
  const { src } = await config.resolve("structure");

  if (
    src == null ||
    node.path !== src.root.path ||
    node.name !== src.root.name
  ) {
    return exports;
  }

  const modules = await listModules(config);

  const added = await Promise.all(
    modules.map(async (module) => {
      return listModuleRootExports(config, module);
    }),
  );

  return [...exports, ...added.flat()];
}
