import { filter } from "#modules/array/utils/filter";
import { wordBoundaryPattern } from "#modules/string/constants";
import { unaccent } from "#modules/string/utils/unaccent";
import type { CasingOptions } from "#modules/string/types/CasingOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Splits the string into words on whitespace, `-`, `_`, `.`, case changes and
 * digit boundaries, dropping the separators and keeping each word's case; accents
 * are removed only when `unaccent` is set. Nullish input is returned as is.
 */
export function splitWords(string: string, options?: CasingOptions): string[];
export function splitWords<Value extends null | undefined>(
  string: Value,
  options?: CasingOptions,
): Value;
export function splitWords(
  string: Maybe<string>,
  options?: CasingOptions,
): Maybe<string[]>;
export function splitWords(
  string: Maybe<string>,
  options: CasingOptions = {},
): Maybe<string[]> {
  if (string == null) {
    return string;
  }

  const source = options.unaccent === true ? unaccent(string) : string;

  const parts = source.split(wordBoundaryPattern);

  return filter(parts, (part) => part !== "");
}
