import type {
  BarrelExport,
  LoadedConfig,
  StructureNode,
} from "@auaust/engrenage/extensions";

/**
 * Lists the `utils/<prefix>*.ts` files of a module with the name each exports.
 */
export async function listModuleUtils(
  config: LoadedConfig,
  module: StructureNode,
  prefix: string,
): Promise<Required<Pick<BarrelExport, "binding" | "file">>[]> {
  const files = await config.context.filesystem.glob(
    `${module.path}/utils/${prefix}*.ts`,
  );

  return [...files]
    .map((file) => {
      return {
        file,
        binding: file.slice(file.lastIndexOf("/") + 1, -".ts".length),
      };
    })
    .toSorted((a, b) => a.file.localeCompare(b.file));
}
