import { identifierPattern } from "@auaust/engrenage/typescript/constants";

/**
 * Returns the `@shorthand` names among the JSDoc `tags` of `binding` in `file`, failing on an empty tag or one that is not an identifier.
 */
export function parseShorthands(
  tags: ReadonlyMap<string, readonly string[]>,
  file: string,
  binding: string,
): readonly string[] {
  const shorthands = tags.get("shorthand") ?? [];

  for (const shorthand of shorthands) {
    if (!identifierPattern.test(shorthand)) {
      throw new Error(
        `${file} declares an invalid @shorthand "${shorthand}" on ${binding}`,
      );
    }
  }

  return shorthands;
}
