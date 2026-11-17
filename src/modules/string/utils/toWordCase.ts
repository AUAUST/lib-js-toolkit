import { resolveOptions } from "#modules/string/internals/resolveOptions";
import { toLocaleLowerCase } from "#modules/string/utils/toLocaleLowerCase";
import { toLocaleUpperCase } from "#modules/string/utils/toLocaleUpperCase";
import type { WordCaseOptions } from "#modules/string/types/WordCaseOptions";
import type { Maybe } from "#types/Maybe";
import type { OptionsOrField } from "#types/OptionsOrField";

/**
 * Lowercases the string following `locale`, then uppercases its first code point
 * when `capitalized` is set; a nullish string returns `undefined`.
 *
 * `locale` may be passed alone in place of the options.
 *
 * @root
 */
export function toWordCase<Value extends string>(
  string: Value,
  options?: {
    readonly capitalized?: false;
    readonly locale?: undefined;
  },
): string extends Value ? string : Lowercase<Value>;
export function toWordCase<Value extends string>(
  string: Value,
  options: {
    readonly capitalized: true;
    readonly locale?: undefined;
  },
): string extends Value ? string : Capitalize<Lowercase<Value>>;
export function toWordCase(
  string: string,
  options?: OptionsOrField<WordCaseOptions, "locale">,
): string;
export function toWordCase(
  string: null | undefined,
  options?: OptionsOrField<WordCaseOptions, "locale">,
): undefined;
export function toWordCase(
  string: Maybe<string>,
  options?: OptionsOrField<WordCaseOptions, "locale">,
): string | undefined;
export function toWordCase(
  string: Maybe<string>,
  optionsOrField?: OptionsOrField<WordCaseOptions, "locale">,
): string | undefined {
  if (string == null) {
    return;
  }

  const options = resolveOptions<WordCaseOptions, "locale">(
    optionsOrField,
    "locale",
  );

  const lowered = toLocaleLowerCase(string, options);

  if (options.capitalized !== true) {
    return lowered;
  }

  // @debt Repeats `capitalize`'s first-code-point split because `capitalize` takes no locale; a locale-aware `capitalize` would own it.
  const [first = ""] = lowered;

  return toLocaleUpperCase(first, options) + lowered.slice(first.length);
}
