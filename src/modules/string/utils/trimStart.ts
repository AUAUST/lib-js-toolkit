import { charRunPattern } from "#modules/string/internals/charRunPattern";
import type { TrimOptions } from "#modules/string/types/TrimOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Removes whitespace, or the `chars` characters, from the start. Nullish
 * input is returned as is.
 *
 * @native nullsafe String.prototype.trimStart
 */
export function trimStart(string: string, options?: TrimOptions): string;
export function trimStart<Value extends null | undefined>(
  string: Value,
  options?: TrimOptions,
): Value;
export function trimStart(
  string: Maybe<string>,
  options?: TrimOptions,
): Maybe<string>;
export function trimStart(
  string: Maybe<string>,
  options: TrimOptions = {},
): Maybe<string> {
  if (string == null) {
    return string;
  }

  if (options.chars == null) {
    return string.trimStart();
  }

  const charRun = charRunPattern(options.chars);

  return string.replace(new RegExp(`^${charRun}`, "gu"), "");
}
