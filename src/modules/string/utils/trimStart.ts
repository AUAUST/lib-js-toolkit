import { charRunPattern } from "#modules/string/internals/charRunPattern";
import type { TrimOptions } from "#modules/string/types/TrimOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Removes whitespace, or the `chars` characters, from the start. A nullish
 * string returns `undefined`.
 *
 * @native nullsafe String.prototype.trimStart
 */
export function trimStart(string: string, options?: TrimOptions): string;
export function trimStart(
  string: null | undefined,
  options?: TrimOptions,
): undefined;
export function trimStart(
  string: Maybe<string>,
  options?: TrimOptions,
): string | undefined;
export function trimStart(
  string: Maybe<string>,
  options: TrimOptions = {},
): string | undefined {
  if (string == null) {
    return;
  }

  if (options.chars == null) {
    return string.trimStart();
  }

  const charRun = charRunPattern(options.chars);

  return string.replace(new RegExp(`^${charRun}`, "gu"), "");
}
