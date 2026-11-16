import { isIterable } from "#modules/iterable/guards/isIterable";
import { entries } from "#modules/object/utils/entries";
import { record } from "#modules/object/utils/record";
import type { Maybe } from "#types/Maybe";

/**
 * Resolves once every value has settled, with `Promise.all` semantics: non-promise
 * values count as resolved, functions are never called and the first rejection
 * rejects. An array resolves to a tuple of settled values; any other iterable
 * resolves to an array of its settled values, so a `Map` resolves to its entries;
 * any other object resolves to a record of its own enumerable string keys. A
 * nullish input resolves to `undefined`.
 *
 * @shorthand concurrent
 * @native variant Promise.all
 */
export function awaitAll<const Values extends readonly unknown[] | []>(
  values: Values,
): Promise<{ -readonly [Index in keyof Values]: Awaited<Values[Index]> }>;
export function awaitAll<const Values extends readonly unknown[] | []>(
  values: Maybe<Values>,
): Promise<
  { -readonly [Index in keyof Values]: Awaited<Values[Index]> } | undefined
>;
export function awaitAll<Value>(
  values: Iterable<Value> & object,
): Promise<Awaited<Value>[]>;
export function awaitAll<Value>(
  values: Maybe<Iterable<Value> & object>,
): Promise<Awaited<Value>[] | undefined>;
export function awaitAll<Values extends object>(
  values: Values,
): Promise<{
  -readonly [Key in keyof Values as Key extends string ? Key : never]: Awaited<
    Values[Key]
  >;
}>;
export function awaitAll<Values extends object>(
  values: Maybe<Values>,
): Promise<
  | {
      -readonly [
        Key in keyof Values as Key extends string ? Key : never
      ]: Awaited<Values[Key]>;
    }
  | undefined
>;
export function awaitAll(values: Maybe<object>): Promise<unknown> {
  if (values == null) {
    return Promise.resolve(undefined);
  }

  if (isIterable(values)) {
    return Promise.all(values);
  }

  // @debt `ObjectEntry<object>` resolves to `never`, so this annotation widens an unsound `never[]` instead of `entries` typing a non-literal object.
  const pairs: [string, unknown][] = entries(values);

  return Promise.all(pairs.map(([, value]) => value)).then((settled) => {
    return record(
      pairs.map(([key], index) => {
        return [key, settled[index]];
      }),
    );
  });
}
