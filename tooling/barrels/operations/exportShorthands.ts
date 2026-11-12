import type {
  BarrelExport,
  LoadedConfig,
  StructureNode,
} from "@auaust/engrenage/extensions";

import { findModule } from "#tooling/barrels/operations/findModule";
import { readShorthands } from "#tooling/barrels/operations/readShorthands";
import { isOwnUtilsExport } from "#tooling/barrels/utils/isOwnUtilsExport";

/**
 * Adds `export { <helper> as <shorthand> }` to a module entry for each `@shorthand` tag of its utils.
 */
export async function exportShorthands(
  node: StructureNode,
  exports: readonly BarrelExport[],
  config: LoadedConfig,
): Promise<readonly BarrelExport[]> {
  const module = await findModule(config, node);

  if (module == null) {
    return exports;
  }

  const added = await Promise.all(
    exports.map(async (exported) => {
      if (!isOwnUtilsExport(exported, module)) {
        return [];
      }

      const { file, binding } = exported;

      const shorthands = await readShorthands(config, file, binding);

      return shorthands.map((name) => {
        return {
          file,
          binding,
          name,
        };
      });
    }),
  );

  return [...exports, ...added.flat()];
}
