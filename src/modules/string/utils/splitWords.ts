import { filter } from "#modules/array/utils/filter";
import {
  apostrophePattern,
  wordBoundaryPattern,
} from "#modules/string/constants";
import { remove } from "#modules/string/utils/remove";
import { unaccent } from "#modules/string/utils/unaccent";
import type { CasingOptions } from "#modules/string/types/CasingOptions";
import type { SplitWords } from "#modules/string/types/SplitWords";
import type { Maybe } from "#types/Maybe";

/**
 * Splits the string into words on every run of characters that are neither
 * letters, marks nor digits, on case changes and on digit boundaries, dropping
 * those runs and keeping each word's case. Apostrophes are removed without
 * breaking the word (`don't` gives `dont`); accents are removed only when
 * `unaccent` is set. A nullish string returns `undefined`.
 */
export function splitWords<Value extends string>(
  string: Value,
): SplitWords<Value>;
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

  const parts = remove(source, apostrophePattern).split(wordBoundaryPattern);

  return filter(parts, (part) => part !== "");
}
