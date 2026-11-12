import type { LoadedConfig } from "@auaust/engrenage/extensions";

import { readJsdocTags } from "#tooling/barrels/operations/readJsdocTags";
import { parseShorthands } from "#tooling/barrels/utils/parseShorthands";

/**
 * Reads the `@shorthand` names of `binding` in `file`, failing on an empty tag or one that is not an identifier.
 */
export async function readShorthands(
  config: LoadedConfig,
  file: string,
  binding: string,
): Promise<readonly string[]> {
  const tags = await readJsdocTags(config, file, binding);

  return parseShorthands(tags, file, binding);
}
