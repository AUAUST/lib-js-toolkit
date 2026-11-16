import { join } from "#modules/array/utils/join";
import { splitWords } from "#modules/string/utils/splitWords";
import type { CasingOptions } from "#modules/string/types/CasingOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Splits the string through `splitWords` and joins the words with `delimiter`,
 * keeping each word's case; a nullish string returns `undefined`.
 */
export function toDelimitedCase(
  string: string,
  delimiter: string,
  options?: CasingOptions,
): string;
export function toDelimitedCase(
  string: null | undefined,
  delimiter: string,
  options?: CasingOptions,
): undefined;
export function toDelimitedCase(
  string: Maybe<string>,
  delimiter: string,
  options?: CasingOptions,
): string | undefined;
export function toDelimitedCase(
  string: Maybe<string>,
  delimiter: string,
  options: CasingOptions = {},
): string | undefined {
  if (string != null) {
    return join(splitWords(string, options), delimiter);
  }
}
