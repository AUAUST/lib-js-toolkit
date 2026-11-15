import type { Maybe } from "#types/Maybe";

/**
 * Inserts the value at the position, as `splice` does: a negative position counts
 * from the end, so `-1` inserts before the last character, and positions out of
 * range are clamped. Nullish input is returned as is.
 */
export function insert(string: string, position: number, value: string): string;
export function insert<Value extends null | undefined>(
  string: Value,
  position: number,
  value: string,
): Value;
export function insert(
  string: Maybe<string>,
  position: number,
  value: string,
): Maybe<string>;
export function insert(
  string: Maybe<string>,
  position: number,
  value: string,
): Maybe<string> {
  if (string == null) {
    return string;
  }

  return string.slice(0, position) + value + string.slice(position);
}
