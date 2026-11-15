import { escapeRegExp } from "#modules/string/utils/escapeRegExp";
import type { TrimOptions } from "#modules/string/types/TrimOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Removes whitespace, or the `chars` characters, from both ends. Nullish
 * input is returned as is.
 *
 * @native nullsafe String.prototype.trim
 */
export function trim(string: string, options?: TrimOptions): string;
export function trim<Value extends null | undefined>(
  string: Value,
  options?: TrimOptions,
): Value;
export function trim(
  string: Maybe<string>,
  options?: TrimOptions,
): Maybe<string>;
export function trim(
  string: Maybe<string>,
  options: TrimOptions = {},
): Maybe<string> {
  if (string == null) {
    return string;
  }

  if (options.chars == null) {
    return string.trim();
  }

  const charRun = `[${escapeRegExp(options.chars)}]+`;

  return string.replace(new RegExp(`^${charRun}|${charRun}$`, "gu"), "");
}
