import { asArray } from "#modules/array/utils/asArray";
import type { Maybe } from "#types/Maybe";

type Spread<Values extends readonly unknown[]> = Values extends readonly [
  infer Head,
  ...infer Rest,
]
  ? [...(Head extends readonly unknown[] ? Head : [Head]), ...Spread<Rest>]
  : Values extends readonly []
    ? []
    : (Values[number] extends infer Value
        ? Value extends readonly (infer Element)[]
          ? Element
          : Value
        : never)[];

/**
 * Returns a new array holding the items of an array followed by each value, an
 * array value contributing its items instead; tuples keep their slots. Any other
 * iterable but a string is copied once first; only array values are spread. A
 * nullish iterable returns `undefined`.
 *
 * @throws {TypeError} when the iterable is a string or is not iterable.
 * @native equal Array.prototype.concat
 */
export function concat<
  Items extends readonly unknown[],
  Values extends readonly unknown[],
>(iterable: Items, ...values: Values): [...Items, ...Spread<Values>];
export function concat<Item, Values extends readonly unknown[]>(
  iterable: Iterable<Item> & object,
  ...values: Values
): [...Item[], ...Spread<Values>];
export function concat<
  Items extends readonly unknown[],
  Values extends readonly unknown[],
>(
  iterable: Maybe<Items>,
  ...values: Values
): [...Items, ...Spread<Values>] | undefined;
export function concat<Item, Values extends readonly unknown[]>(
  iterable: Maybe<Iterable<Item> & object>,
  ...values: Values
): [...Item[], ...Spread<Values>] | undefined;
export function concat(
  iterable: Maybe<Iterable<unknown> & object>,
  ...values: readonly unknown[]
): unknown[] | undefined {
  if (iterable == null) {
    return;
  }

  const array = asArray(iterable);

  return array.concat(...values);
}
