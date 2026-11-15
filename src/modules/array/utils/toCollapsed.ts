import type { Maybe } from "#types/Maybe";

/**
 * Copies an array's items into a new array without its holes, keeping their
 * order. A nullish array returns `undefined`.
 */
export function toCollapsed<Items extends readonly unknown[]>(
  array: Items,
): Items[number][];
export function toCollapsed<Items extends readonly unknown[]>(
  array: Maybe<Items>,
): Items[number][] | undefined;
export function toCollapsed(
  array: Maybe<readonly unknown[]>,
): unknown[] | undefined {
  return array?.filter(() => true);
}
