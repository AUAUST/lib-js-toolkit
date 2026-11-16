import type { Maybe } from "#types/Maybe";
import type { Split } from "#types/Split";

/**
 * Splits the string around each match of the separator, keeping at most `limit`
 * parts. A literal string split by a literal string separator without a limit
 * returns the tuple of its parts. A nullish string returns `undefined`.
 *
 * @native equal String.prototype.split
 */
export function split<
  const Input extends string,
  const Separator extends string,
>(string: Input, separator: Separator): Split<Input, Separator>;
export function split(
  string: string,
  separator: string | RegExp,
  limit?: number,
): string[];
export function split(
  string: null | undefined,
  separator: string | RegExp,
  limit?: number,
): undefined;
export function split(
  string: Maybe<string>,
  separator: string | RegExp,
  limit?: number,
): string[] | undefined;
export function split(
  string: Maybe<string>,
  separator: string | RegExp,
  limit?: number,
): string[] | undefined {
  return string?.split(separator, limit);
}
