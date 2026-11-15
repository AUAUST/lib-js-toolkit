import { splitWords } from "#modules/string/utils/splitWords";
import type { CasingOptions } from "#modules/string/types/CasingOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Splits the string through `splitWords` and joins the words with `delimiter`,
 * keeping each word's case; nullish input is returned as is.
 */
export function toDelimitedCase(
  string: string,
  delimiter: string,
  options?: CasingOptions,
): string;
export function toDelimitedCase<Value extends null | undefined>(
  string: Value,
  delimiter: string,
  options?: CasingOptions,
): Value;
export function toDelimitedCase(
  string: Maybe<string>,
  delimiter: string,
  options?: CasingOptions,
): Maybe<string>;
export function toDelimitedCase(
  string: Maybe<string>,
  delimiter: string,
  options: CasingOptions = {},
): Maybe<string> {
  if (string == null) {
    return string;
  }

  return splitWords(string, options).join(delimiter);
}
