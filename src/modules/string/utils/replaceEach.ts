import { isArray } from "#modules/array/guards/isArray";
import { entries } from "#modules/object/utils/entries";
import { isString } from "#modules/string/guards/isString";
import type { ReplaceEachOptions } from "#modules/string/types/ReplaceEachOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Applies each replacement in entry order, every one on the previous result.
 * Replacements are a record of substrings, or pairs whose first item is a
 * substring or a regex; replacements are inserted literally, without `$` patterns.
 * Nullish input is returned as is.
 */
export function replaceEach(
  string: string,
  replacements: ReplaceEachReplacements,
  options?: ReplaceEachOptions,
): string;
export function replaceEach<Value extends null | undefined>(
  string: Value,
  replacements: ReplaceEachReplacements,
  options?: ReplaceEachOptions,
): Value;
export function replaceEach(
  string: Maybe<string>,
  replacements: ReplaceEachReplacements,
  options?: ReplaceEachOptions,
): Maybe<string>;
export function replaceEach(
  string: Maybe<string>,
  replacements: ReplaceEachReplacements,
  options: ReplaceEachOptions = {},
): Maybe<string> {
  if (string == null) {
    return string;
  }

  const pairs = isArray(replacements) ? replacements : entries(replacements);

  let result = string;

  for (const [pattern, replacement] of pairs) {
    result = options.all && isString(pattern)
      ? result.replaceAll(pattern, () => replacement)
      : result.replace(pattern, () => replacement);
  }

  return result;
}

/**
 * Replacements of `replaceEach`: a record from substrings to replacements, or
 * ordered pairs of a substring or regex and its replacement.
 */
export type ReplaceEachReplacements =
  | Readonly<Record<string, string>>
  | readonly (readonly [pattern: string | RegExp, replacement: string])[];
