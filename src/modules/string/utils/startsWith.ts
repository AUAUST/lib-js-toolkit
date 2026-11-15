import type { Maybe } from "#types/Maybe";

/**
 * Returns whether the string starts with the search string at the position;
 * nullish input is returned as is.
 *
 * @native equal String.prototype.startsWith
 */
export function startsWith(
  string: string,
  search: string,
  position?: number,
): boolean;
export function startsWith<Value extends null | undefined>(
  string: Value,
  search: string,
  position?: number,
): Value;
export function startsWith(
  string: Maybe<string>,
  search: string,
  position?: number,
): Maybe<boolean>;
export function startsWith(
  string: Maybe<string>,
  search: string,
  position?: number,
): Maybe<boolean> {
  return string == null ? string : string.startsWith(search, position);
}
