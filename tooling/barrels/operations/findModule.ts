import type { LoadedConfig, StructureNode } from "@auaust/engrenage/extensions";

import { listModules } from "#tooling/barrels/operations/listModules";

/**
 * Finds the module whose entry the barrel of `node` is, if any.
 */
export async function findModule(
  config: LoadedConfig,
  node: StructureNode,
): Promise<StructureNode | undefined> {
  const modules = await listModules(config);

  return modules.find((module) => module.path === node.path);
}
