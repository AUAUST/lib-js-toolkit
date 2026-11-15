import { splitSeparatorOptions } from "#modules/string/internals/splitSeparatorOptions";
import type { SeparatorOptions } from "#modules/string/types/SeparatorOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Appends the parts to the string, joined by the `separator` of a last options
 * argument. Empty parts are kept. Nullish input is returned as is.
 *
 * @native variant String.prototype.concat
 */
export function concat(
  string: string,
  ...parts: [...parts: string[], options: SeparatorOptions] | string[]
): string;
export function concat<Value extends null | undefined>(
  string: Value,
  ...parts: [...parts: string[], options: SeparatorOptions] | string[]
): Value;
export function concat(
  string: Maybe<string>,
  ...parts: [...parts: string[], options: SeparatorOptions] | string[]
): Maybe<string>;
export function concat(
  string: Maybe<string>,
  ...parts: [...parts: string[], options: SeparatorOptions] | string[]
): Maybe<string> {
  if (string == null) {
    return string;
  }

  const [strings, separator] = splitSeparatorOptions(parts);

  return [string, ...strings].join(separator);
}
