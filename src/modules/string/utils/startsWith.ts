import type { Maybe } from "#types/Maybe";

/**
 * Returns whether the string starts with the search string at the position; a
 * nullish string returns `undefined`.
 *
 * @native equal String.prototype.startsWith
 */
export function startsWith(
  string: string,
  search: string,
  position?: number,
): boolean;
export function startsWith(
  string: null | undefined,
  search: string,
  position?: number,
): undefined;
export function startsWith(
  string: Maybe<string>,
  search: string,
  position?: number,
): boolean | undefined;
export function startsWith(
  string: Maybe<string>,
  search: string,
  position?: number,
): boolean | undefined {
  return string == null ? undefined : string.startsWith(search, position);
}
