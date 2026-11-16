import { splitSeparatorOptions } from "#modules/string/internals/splitSeparatorOptions";
import type { SeparatorOptions } from "#modules/string/types/SeparatorOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Appends the parts to the string, joined by the `separator` of a last options
 * argument. Empty parts are kept. A nullish string returns `undefined`.
 *
 * @native variant String.prototype.concat
 */
export function concat(
  string: string,
  ...parts: [...parts: string[], options: SeparatorOptions] | string[]
): string;
export function concat(
  string: null | undefined,
  ...parts: [...parts: string[], options: SeparatorOptions] | string[]
): undefined;
export function concat(
  string: Maybe<string>,
  ...parts: [...parts: string[], options: SeparatorOptions] | string[]
): string | undefined;
export function concat(
  string: Maybe<string>,
  ...parts: [...parts: string[], options: SeparatorOptions] | string[]
): string | undefined {
  if (string == null) {
    return;
  }

  const [strings, separator] = splitSeparatorOptions(parts);

  return [string, ...strings].join(separator);
}
