import { map } from "#modules/array/utils/map";
import { whitespaceRunPattern } from "#modules/string/constants";
import { capitalize } from "#modules/string/utils/capitalize";
import type { Maybe } from "#types/Maybe";

/**
 * Uppercases the first code point of each whitespace-separated word, keeping
 * whitespace as given; nullish input is returned as is.
 */
export function capitalizeWords(string: string): string;
export function capitalizeWords<Value extends null | undefined>(
  string: Value,
): Value;
export function capitalizeWords(string: Maybe<string>): Maybe<string>;
export function capitalizeWords(string: Maybe<string>): Maybe<string> {
  if (string == null) {
    return string;
  }

  const parts = string.split(whitespaceRunPattern);

  return map(parts, (part) => capitalize(part)).join("");
}
