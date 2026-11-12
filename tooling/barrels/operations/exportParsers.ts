import type {
  BarrelExport,
  LoadedConfig,
  StructureNode,
} from "@auaust/engrenage/extensions";

import { findModule } from "#tooling/barrels/operations/findModule";
import { listModules } from "#tooling/barrels/operations/listModules";
import { listModuleUtils } from "#tooling/barrels/operations/listModuleUtils";
import { lowerFirst } from "#tooling/barrels/utils/lowerFirst";
import { splitPrefix } from "#tooling/barrels/utils/splitPrefix";

/**
 * Fills the `parse` entry with `export { parse<Type> as <type> }` for each module's `utils/parse<Type>.ts`.
 */
export async function exportParsers(
  node: StructureNode,
  exports: readonly BarrelExport[],
  config: LoadedConfig,
): Promise<readonly BarrelExport[]> {
  const module = await findModule(config, node);

  if (module?.name !== "parse") {
    return exports;
  }

  const modules = await listModules(config);

  const parsers = await Promise.all(
    modules.map(async (candidate) => {
      return listModuleUtils(config, candidate, "parse");
    }),
  );

  return [
    ...exports,
    ...parsers.flat().flatMap(({ file, binding }) => {
      const split = splitPrefix(binding, ["parse"]);

      return split == null
        ? []
        : {
            file,
            binding,
            name: lowerFirst(split.type),
          };
    }),
  ];
}
