import { map } from "#modules/array/utils/map";
import { whitespaceRunPattern } from "#modules/string/constants";
import { uncapitalize } from "#modules/string/utils/uncapitalize";
import type { Maybe } from "#types/Maybe";

/**
 * Lowercases the first code point of each whitespace-separated word, keeping
 * whitespace as given; a nullish string returns `undefined`.
 */
export function uncapitalizeWords(string: string): string;
export function uncapitalizeWords(string: null | undefined): undefined;
export function uncapitalizeWords(string: Maybe<string>): string | undefined;
export function uncapitalizeWords(string: Maybe<string>): string | undefined {
  if (string == null) {
    return;
  }

  const parts = string.split(whitespaceRunPattern);

  return map(parts, (part) => uncapitalize(part)).join("");
}
