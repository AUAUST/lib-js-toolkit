import type { Maybe } from "#types/Maybe";

/**
 * Calls the function with each item of an array and its index, skipping holes;
 * returns nothing. A nullish array calls nothing.
 *
 * @throws {TypeError} when the function is not callable.
 * @native equal Array.prototype.forEach
 */
export function forEach<Items extends readonly unknown[]>(
  array: Maybe<Items>,
  fn: (value: Items[number], index: number) => unknown,
): void {
  if (array != null) {
    Reflect.apply(Array.prototype.forEach, array, [fn]);
  }
}
