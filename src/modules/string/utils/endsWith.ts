import type { Maybe } from "#types/Maybe";

/**
 * Returns whether the string, cut at the end position, ends with the search
 * string; a nullish string returns `undefined`.
 *
 * @native equal String.prototype.endsWith
 */
export function endsWith(
  string: string,
  search: string,
  endPosition?: number,
): boolean;
export function endsWith(
  string: null | undefined,
  search: string,
  endPosition?: number,
): undefined;
export function endsWith(
  string: Maybe<string>,
  search: string,
  endPosition?: number,
): boolean | undefined;
export function endsWith(
  string: Maybe<string>,
  search: string,
  endPosition?: number,
): boolean | undefined {
  return string == null ? undefined : string.endsWith(search, endPosition);
}
