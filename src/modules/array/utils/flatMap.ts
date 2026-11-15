import type { Maybe } from "#types/Maybe";

/**
 * Maps each item of an array, passing it with its index, and flattens each array
 * result by one level into a new array; other results, iterables included, are
 * kept as items. A nullish array returns `undefined`.
 *
 * @throws {TypeError} when the mapper is not a function.
 * @native equal Array.prototype.flatMap
 */
export function flatMap<Items extends readonly unknown[], Output>(
  array: Items,
  mapper: (value: Items[number], index: number) => Output | readonly Output[],
): Output[];
export function flatMap<Items extends readonly unknown[], Output>(
  array: Maybe<Items>,
  mapper: (value: Items[number], index: number) => Output | readonly Output[],
): Output[] | undefined;
export function flatMap(
  array: Maybe<readonly unknown[]>,
  mapper: (value: unknown, index: number) => unknown,
): unknown[] | undefined {
  return array?.flatMap(mapper);
}
