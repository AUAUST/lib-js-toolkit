import { charRunPattern } from "#modules/string/internals/charRunPattern";
import { resolveOptions } from "#modules/string/internals/resolveOptions";
import type { OptionsOrField } from "#modules/string/types/OptionsOrField";
import type { TrimOptions } from "#modules/string/types/TrimOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Removes whitespace, or the `chars` characters, from the start. A nullish
 * string returns `undefined`.
 *
 * `chars` may be passed alone in place of the options.
 *
 * @native nullsafe String.prototype.trimStart
 */
export function trimStart(
  string: string,
  options?: OptionsOrField<TrimOptions, "chars">,
): string;
export function trimStart(
  string: null | undefined,
  options?: OptionsOrField<TrimOptions, "chars">,
): undefined;
export function trimStart(
  string: Maybe<string>,
  options?: OptionsOrField<TrimOptions, "chars">,
): string | undefined;
export function trimStart(
  string: Maybe<string>,
  optionsOrField?: OptionsOrField<TrimOptions, "chars">,
): string | undefined {
  if (string == null) {
    return;
  }

  const {
    chars,
  } = resolveOptions<TrimOptions, "chars">(optionsOrField, "chars");

  if (chars == null) {
    return string.trimStart();
  }

  const charRun = charRunPattern(chars);

  return string.replace(new RegExp(`^${charRun}`, "gu"), "");
}
