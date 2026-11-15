import type { Maybe } from "#types/Maybe";

/**
 * Copies an array's items into a new array in reverse order; holes read
 * as `undefined`, as with `Array.prototype.toReversed`. A nullish array
 * returns `undefined`.
 *
 * @native equal Array.prototype.toReversed
 */
export function toReversed<Items extends readonly unknown[]>(
  array: Items,
): Items[number][];
export function toReversed<Items extends readonly unknown[]>(
  array: Maybe<Items>,
): Items[number][] | undefined;
export function toReversed(
  array: Maybe<readonly unknown[]>,
): unknown[] | undefined {
  return array?.toReversed();
}
