import { isString } from "#modules/string/guards/isString";
import type { SeparatorOptions } from "#modules/string/types/SeparatorOptions";

/**
 * Splits rest arguments ending with optional `SeparatorOptions` into the
 * strings and the separator.
 */
export function splitSeparatorOptions(
  parts: readonly (string | SeparatorOptions)[],
): [strings: string[], separator: string] {
  const last = parts.at(-1);

  const separator = last == null || isString(last)
    ? ""
    : (last.separator ?? "");

  const strings = parts.filter(isString);

  return [strings, separator];
}
