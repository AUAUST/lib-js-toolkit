import type {
  BarrelExport,
  LoadedConfig,
  StructureNode,
} from "@auaust/engrenage/extensions";

import { findModule } from "#tooling/barrels/operations/findModule";
import { isOwnUtilsExport } from "#tooling/barrels/utils/isOwnUtilsExport";
import { splitPrefix } from "#tooling/barrels/utils/splitPrefix";

/**
 * Renames each `utils/assert<Type>.ts` and `utils/ensure<Type>.ts` to `is<Type>`
 * in the `assert` and `ensure` entries.
 */
export async function exportGuardVariants(
  node: StructureNode,
  exports: readonly BarrelExport[],
  config: LoadedConfig,
): Promise<readonly BarrelExport[]> {
  const module = await findModule(config, node);

  if (
    module == null ||
    (module.name !== "assert" && module.name !== "ensure")
  ) {
    return exports;
  }

  return exports.map((exported) => {
    if (exported.name != null || !isOwnUtilsExport(exported, module)) {
      return exported;
    }

    const { file, binding } = exported;
    const split = splitPrefix(binding, [module.name]);

    return split == null
      ? exported
      : {
          file,
          binding,
          name: `is${split.type}`,
        };
  });
}
