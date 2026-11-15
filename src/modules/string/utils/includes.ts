import type { Maybe } from "#types/Maybe";

/**
 * Returns whether the string contains the search string from the position on;
 * nullish input is returned as is.
 *
 * @native equal String.prototype.includes
 */
export function includes(
  string: string,
  search: string,
  position?: number,
): boolean;
export function includes<Value extends null | undefined>(
  string: Value,
  search: string,
  position?: number,
): Value;
export function includes(
  string: Maybe<string>,
  search: string,
  position?: number,
): Maybe<boolean>;
export function includes(
  string: Maybe<string>,
  search: string,
  position?: number,
): Maybe<boolean> {
  return string == null ? string : string.includes(search, position);
}
