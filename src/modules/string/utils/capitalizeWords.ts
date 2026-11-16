import { map } from "#modules/array/utils/map";
import { whitespaceRunPattern } from "#modules/string/constants";
import { capitalize } from "#modules/string/utils/capitalize";
import type { Maybe } from "#types/Maybe";

/**
 * Uppercases the first code point of each whitespace-separated word, keeping
 * whitespace as given; a nullish string returns `undefined`.
 */
export function capitalizeWords(string: string): string;
export function capitalizeWords(string: null | undefined): undefined;
export function capitalizeWords(string: Maybe<string>): string | undefined;
export function capitalizeWords(string: Maybe<string>): string | undefined {
  if (string == null) {
    return;
  }

  const parts = string.split(whitespaceRunPattern);

  return map(parts, (part) => capitalize(part)).join("");
}
