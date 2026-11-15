import { map } from "#modules/array/utils/map";
import { whitespaceRunPattern } from "#modules/string/constants";
import { uncapitalize } from "#modules/string/utils/uncapitalize";
import type { Maybe } from "#types/Maybe";

/**
 * Lowercases the first code point of each whitespace-separated word, keeping
 * whitespace as given; nullish input is returned as is.
 */
export function uncapitalizeWords(string: string): string;
export function uncapitalizeWords<Value extends null | undefined>(
  string: Value,
): Value;
export function uncapitalizeWords(string: Maybe<string>): Maybe<string>;
export function uncapitalizeWords(string: Maybe<string>): Maybe<string> {
  if (string == null) {
    return string;
  }

  const parts = string.split(whitespaceRunPattern);

  return map(parts, (part) => uncapitalize(part)).join("");
}
