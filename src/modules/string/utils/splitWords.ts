import { filter } from "#modules/array/utils/filter";
import {
  apostrophePattern,
  wordBoundaryPattern,
} from "#modules/string/constants";
import { resolveOptions } from "#modules/string/internals/resolveOptions";
import { remove } from "#modules/string/utils/remove";
import { unaccent } from "#modules/string/utils/unaccent";
import type { CasingOptions } from "#modules/string/types/CasingOptions";
import type { SplitWords } from "#modules/string/types/SplitWords";
import type { Maybe } from "#types/Maybe";
import type { OptionsOrField } from "#types/OptionsOrField";

/**
 * Splits the string into words on every run of characters that are neither
 * letters, marks nor digits, on case changes and on digit boundaries, dropping
 * those runs and keeping each word's case. Apostrophes are removed without
 * breaking the word (`don't` gives `dont`); accents are removed only when
 * `unaccent` is set. A nullish string returns `undefined`.
 *
 * `locale` may be passed alone in place of the options.
 */
export function splitWords<Value extends string>(
  string: Value,
): SplitWords<Value>;
export function splitWords(
  string: string,
  options?: OptionsOrField<CasingOptions, "locale">,
): string[];
export function splitWords(
  string: null | undefined,
  options?: OptionsOrField<CasingOptions, "locale">,
): undefined;
export function splitWords(
  string: Maybe<string>,
  options?: OptionsOrField<CasingOptions, "locale">,
): string[] | undefined;
export function splitWords(
  string: Maybe<string>,
  optionsOrField?: OptionsOrField<CasingOptions, "locale">,
): string[] | undefined {
  if (string == null) {
    return;
  }

  const options = resolveOptions<CasingOptions, "locale">(
    optionsOrField,
    "locale",
  );

  const source = options.unaccent === true ? unaccent(string) : string;

  const parts = remove(source, apostrophePattern).split(wordBoundaryPattern);

  return filter(parts, (part) => part !== "");
}
