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
 * array value contributing its items instead; tuples keep their slots. A nullish
 * array returns `undefined`.
 *
 * @native equal Array.prototype.concat
 */
export function concat<
  Items extends readonly unknown[],
  Values extends readonly unknown[],
>(array: Items, ...values: Values): [...Items, ...Spread<Values>];
export function concat<
  Items extends readonly unknown[],
  Values extends readonly unknown[],
>(
  array: Maybe<Items>,
  ...values: Values
): [...Items, ...Spread<Values>] | undefined;
export function concat(
  array: Maybe<readonly unknown[]>,
  ...values: readonly unknown[]
): unknown[] | undefined {
  return array?.concat(...values);
}
