import type { Maybe } from "#types/Maybe";

/**
 * Returns whether the string, cut at the end position, ends with the search
 * string; nullish input is returned as is.
 *
 * @native equal String.prototype.endsWith
 */
export function endsWith(
  string: string,
  search: string,
  endPosition?: number,
): boolean;
export function endsWith<Value extends null | undefined>(
  string: Value,
  search: string,
  endPosition?: number,
): Value;
export function endsWith(
  string: Maybe<string>,
  search: string,
  endPosition?: number,
): Maybe<boolean>;
export function endsWith(
  string: Maybe<string>,
  search: string,
  endPosition?: number,
): Maybe<boolean> {
  return string == null ? string : string.endsWith(search, endPosition);
}
