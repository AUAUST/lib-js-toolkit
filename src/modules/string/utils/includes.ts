import type { Maybe } from "#types/Maybe";

/**
 * Returns whether the string contains the search string from the position on; a
 * nullish string returns `undefined`.
 *
 * @native equal String.prototype.includes
 */
export function includes(
  string: string,
  search: string,
  position?: number,
): boolean;
export function includes(
  string: null | undefined,
  search: string,
  position?: number,
): undefined;
export function includes(
  string: Maybe<string>,
  search: string,
  position?: number,
): boolean | undefined;
export function includes(
  string: Maybe<string>,
  search: string,
  position?: number,
): boolean | undefined {
  return string == null ? undefined : string.includes(search, position);
}
