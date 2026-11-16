import { charRunPattern } from "#modules/string/internals/charRunPattern";
import type { TrimOptions } from "#modules/string/types/TrimOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Removes whitespace, or the `chars` characters, from both ends. A nullish
 * string returns `undefined`.
 *
 * @native nullsafe String.prototype.trim
 */
export function trim(string: string, options?: TrimOptions): string;
export function trim(
  string: null | undefined,
  options?: TrimOptions,
): undefined;
export function trim(
  string: Maybe<string>,
  options?: TrimOptions,
): string | undefined;
export function trim(
  string: Maybe<string>,
  options: TrimOptions = {},
): string | undefined {
  if (string == null) {
    return;
  }

  if (options.chars == null) {
    return string.trim();
  }

  const charRun = charRunPattern(options.chars);

  return string.replace(new RegExp(`^${charRun}|${charRun}$`, "gu"), "");
}
