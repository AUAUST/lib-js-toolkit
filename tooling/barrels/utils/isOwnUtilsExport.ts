import type { BarrelExport, StructureNode } from "@auaust/engrenage/extensions";

/**
 * Tells whether `exported` is the value export of `module`'s own `utils/<binding>.ts` file.
 */
export function isOwnUtilsExport(
  exported: BarrelExport,
  module: StructureNode,
): exported is BarrelExport & { readonly binding: string } {
  const { file, binding, typeOnly } = exported;

  return (
    binding != null &&
    typeOnly !== true &&
    file === `${module.path}/utils/${binding}.ts`
  );
}
