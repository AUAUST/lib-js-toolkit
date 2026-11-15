import type { Maybe } from "#types/Maybe";

/**
 * Tells whether an array holds the value, compared by SameValueZero so `NaN`
 * matches `NaN`, from `fromIndex` on, a negative one counted from the end, as
 * with `Array.prototype.includes`. A nullish array returns `undefined`.
 *
 * @native equal Array.prototype.includes
 */
export function includes<Items extends readonly unknown[]>(
  array: Items,
  value: NoInfer<Items[number]>,
  fromIndex?: number,
): boolean;
export function includes<Items extends readonly unknown[]>(
  array: Maybe<Items>,
  value: NoInfer<Items[number]>,
  fromIndex?: number,
): boolean | undefined;
export function includes(
  array: Maybe<readonly unknown[]>,
  value: unknown,
  fromIndex?: number,
): boolean | undefined {
  return array?.includes(value, fromIndex);
}
