import type { Joined } from "#types/Joined";
import type { Maybe } from "#types/Maybe";

/**
 * Joins the items of an array into a string with a separator, `","` by default;
 * `null`, `undefined` and holes join as `""`, as with `Array.prototype.join`.
 * A tuple of literals joins into a literal type. A nullish array returns
 * `undefined`.
 *
 * @native equal Array.prototype.join
 */
export function join<
  const Items extends readonly unknown[],
  Separator extends string = ",",
>(array: Items, separator?: Separator): Joined<Items, Separator>;
export function join<
  const Items extends readonly unknown[],
  Separator extends string = ",",
>(
  array: Maybe<Items>,
  separator?: Separator,
): Joined<Items, Separator> | undefined;
export function join(
  array: Maybe<readonly unknown[]>,
  separator?: string,
): string | undefined {
  return array?.join(separator);
}
