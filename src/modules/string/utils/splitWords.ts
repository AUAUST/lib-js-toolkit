import { filter } from "#modules/array/utils/filter";
import { wordBoundaryPattern } from "#modules/string/constants";
import { unaccent } from "#modules/string/utils/unaccent";
import type { CasingOptions } from "#modules/string/types/CasingOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Splits the string into words on whitespace, `-`, `_`, `.`, case changes and
 * digit boundaries, dropping the separators and keeping each word's case; accents
 * are removed only when `unaccent` is set. A nullish string returns `undefined`.
 */
export function splitWords(string: string, options?: CasingOptions): string[];
export function splitWords(
  string: null | undefined,
  options?: CasingOptions,
): undefined;
export function splitWords(
  string: Maybe<string>,
  options?: CasingOptions,
): string[] | undefined;
export function splitWords(
  string: Maybe<string>,
  options: CasingOptions = {},
): string[] | undefined {
  if (string == null) {
    return;
  }

  const source = options.unaccent === true ? unaccent(string) : string;

  const parts = source.split(wordBoundaryPattern);

  return filter(parts, (part) => part !== "");
}
