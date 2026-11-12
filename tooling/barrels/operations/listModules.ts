import type { LoadedConfig, StructureNode } from "@auaust/engrenage/extensions";

function collectDomains(node: StructureNode): StructureNode[] {
  return node.children.flatMap((child) => {
    return [
      ...(child.kind === "domain" && child.public === true ? [child] : []),
      ...collectDomains(child),
    ];
  });
}

/**
 * Lists the public domains of the src environment, toolkit's modules.
 */
export async function listModules(
  config: LoadedConfig,
): Promise<StructureNode[]> {
  const { src } = await config.resolve("structure");

  if (src == null) {
    return [];
  }

  return collectDomains(src.root);
}
