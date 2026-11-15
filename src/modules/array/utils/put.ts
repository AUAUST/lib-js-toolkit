import type { Maybe } from "#types/Maybe";

/**
 * Copies an array into a new array with the value at an index, a negative one
 * counted from the end; holes read as `undefined`, as with `Array.prototype.with`.
 * A nullish array returns `undefined`.
 *
 * @throws {RangeError} when the index falls outside the array.
 * @native equal Array.prototype.with
 */
export function put<Items extends readonly unknown[]>(
  array: Items,
  index: number,
  value: NoInfer<Items[number]>,
): Items[number][];
export function put<Items extends readonly unknown[]>(
  array: Maybe<Items>,
  index: number,
  value: NoInfer<Items[number]>,
): Items[number][] | undefined;
export function put(
  array: Maybe<readonly unknown[]>,
  index: number,
  value: unknown,
): unknown[] | undefined {
  return array?.with(index, value);
}
