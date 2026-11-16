import type { Maybe } from "#types/Maybe";

/**
 * Inserts the value at the position, as `splice` does: a negative position counts
 * from the end, so `-1` inserts before the last character, and positions out of
 * range are clamped. A nullish string returns `undefined`.
 */
export function insert(string: string, position: number, value: string): string;
export function insert(
  string: null | undefined,
  position: number,
  value: string,
): undefined;
export function insert(
  string: Maybe<string>,
  position: number,
  value: string,
): string | undefined;
export function insert(
  string: Maybe<string>,
  position: number,
  value: string,
): string | undefined {
  if (string != null) {
    return string.slice(0, position) + value + string.slice(position);
  }
}
