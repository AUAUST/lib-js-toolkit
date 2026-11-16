import type { Maybe } from "#types/Maybe";

/**
 * Returns the array itself, typed as an array of the union of its element types,
 * of unknown length; a readonly array stays readonly. Only the type changes. A
 * nullish array returns `undefined`.
 */
export function loosen<Items extends unknown[]>(array: Items): Items[number][];
export function loosen<Items extends unknown[]>(
  array: Maybe<Items>,
): Items[number][] | undefined;
export function loosen<Items extends readonly unknown[]>(
  array: Items,
): readonly Items[number][];
export function loosen<Items extends readonly unknown[]>(
  array: Maybe<Items>,
): readonly Items[number][] | undefined;
export function loosen(
  array: Maybe<readonly unknown[]>,
): readonly unknown[] | undefined {
  return array ?? undefined;
}
