import { toLocaleLowerCase } from "#modules/string/utils/toLocaleLowerCase";
import { toLocaleUpperCase } from "#modules/string/utils/toLocaleUpperCase";
import type { WordCaseOptions } from "#modules/string/types/WordCaseOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Lowercases the string following `locale`, then uppercases its first code point
 * when `capitalized` is set; a nullish string returns `undefined`.
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
export function toWordCase(string: string, options?: WordCaseOptions): string;
export function toWordCase(
  string: null | undefined,
  options?: WordCaseOptions,
): undefined;
export function toWordCase(
  string: Maybe<string>,
  options?: WordCaseOptions,
): string | undefined;
export function toWordCase(
  string: Maybe<string>,
  options: WordCaseOptions = {},
): string | undefined {
  if (string == null) {
    return;
  }

  const lowered = toLocaleLowerCase(string, options);

  if (options.capitalized !== true) {
    return lowered;
  }

  const [first = ""] = lowered;

  return toLocaleUpperCase(first, options) + lowered.slice(first.length);
}
