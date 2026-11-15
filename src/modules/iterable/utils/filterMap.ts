import { isFunction } from "#modules/function/guards/isFunction";
import {
  memberValue,
  type MemberValue,
} from "#modules/general/utils/memberValue";
import { isPropertyKey } from "#modules/guard/guards/isPropertyKey";
import { isIterable } from "#modules/iterable/guards/isIterable";
import type { Maybe } from "#types/Maybe";

// @debt The implementation signature types values as records so `memberValue` accepts any property key; the overloads hold the real contract.

// @debt A type predicate guarding a type wider than a literal value union, such as `isString` over `1 | "a"`, fails inference instead of narrowing to the matching members.

/**
 * Lazily maps each value of an iterable and keeps the results that are not
 * `undefined`, `null` included; returns a new single-use iterator and never
 * mutates the source. A property name instead maps each value to its member,
 * calling it when it is a method; a union value type accepts only a name every
 * member has. A leading predicate or type predicate first selects the values to
 * map, and a type predicate narrows the values the mapper receives. The predicate
 * and the mapper receive each value with its index among the values read. The
 * source is read lazily: changes made to it before a value is pulled are visible.
 * A nullish source returns `undefined`.
 *
 * @throws {TypeError} at call time when the source is not iterable, the mapper
 * is neither a function nor a property key, or the predicate is not a function.
 */
export function filterMap<Input, Output>(
  iterable: Iterable<Input>,
  mapper: (value: Input, index: number) => Output,
): IteratorObject<Exclude<Output, undefined>, undefined>;
export function filterMap<Input, const Name extends keyof Input>(
  iterable: Iterable<Input>,
  property: Name,
): IteratorObject<Exclude<MemberValue<Input, Name>, undefined>, undefined>;
export function filterMap<Input, Kept extends Input, Output>(
  iterable: Iterable<Input>,
  predicate: (value: Input, index: number) => value is Kept,
  mapper: (value: Kept, index: number) => Output,
): IteratorObject<Exclude<Output, undefined>, undefined>;
export function filterMap<
  Input,
  Kept extends Input,
  const Name extends keyof Kept,
>(
  iterable: Iterable<Input>,
  predicate: (value: Input, index: number) => value is Kept,
  property: Name,
): IteratorObject<Exclude<MemberValue<Kept, Name>, undefined>, undefined>;
export function filterMap<Input, Output>(
  iterable: Iterable<Input>,
  predicate: (value: Input, index: number) => unknown,
  mapper: (value: Input, index: number) => Output,
): IteratorObject<Exclude<Output, undefined>, undefined>;
export function filterMap<Input, const Name extends keyof Input>(
  iterable: Iterable<Input>,
  predicate: (value: Input, index: number) => unknown,
  property: Name,
): IteratorObject<Exclude<MemberValue<Input, Name>, undefined>, undefined>;
export function filterMap<Input, Output>(
  iterable: Maybe<Iterable<Input>>,
  mapper: (value: Input, index: number) => Output,
): IteratorObject<Exclude<Output, undefined>, undefined> | undefined;
export function filterMap<Input, const Name extends keyof Input>(
  iterable: Maybe<Iterable<Input>>,
  property: Name,
):
  | IteratorObject<Exclude<MemberValue<Input, Name>, undefined>, undefined>
  | undefined;
export function filterMap<Input, Kept extends Input, Output>(
  iterable: Maybe<Iterable<Input>>,
  predicate: (value: Input, index: number) => value is Kept,
  mapper: (value: Kept, index: number) => Output,
): IteratorObject<Exclude<Output, undefined>, undefined> | undefined;
export function filterMap<
  Input,
  Kept extends Input,
  const Name extends keyof Kept,
>(
  iterable: Maybe<Iterable<Input>>,
  predicate: (value: Input, index: number) => value is Kept,
  property: Name,
):
  | IteratorObject<Exclude<MemberValue<Kept, Name>, undefined>, undefined>
  | undefined;
export function filterMap<Input, Output>(
  iterable: Maybe<Iterable<Input>>,
  predicate: (value: Input, index: number) => unknown,
  mapper: (value: Input, index: number) => Output,
): IteratorObject<Exclude<Output, undefined>, undefined> | undefined;
export function filterMap<Input, const Name extends keyof Input>(
  iterable: Maybe<Iterable<Input>>,
  predicate: (value: Input, index: number) => unknown,
  property: Name,
):
  | IteratorObject<Exclude<MemberValue<Input, Name>, undefined>, undefined>
  | undefined;
export function filterMap(
  iterable: Maybe<Iterable<Record<PropertyKey, unknown>>>,
  first: ((value: unknown, index: number) => unknown) | PropertyKey,
  second?: ((value: unknown, index: number) => unknown) | PropertyKey,
): IteratorObject<unknown, undefined> | undefined {
  if (iterable == null) {
    return;
  }

  if (!isIterable(iterable)) {
    throw new TypeError("Expected an iterable.");
  }

  if (second === undefined) {
    return filterMapped(iterable, undefined, toMapper(first));
  }

  if (!isFunction(first)) {
    throw new TypeError("Expected a predicate function.");
  }

  return filterMapped(iterable, first, toMapper(second));
}

function toMapper(
  mapper: ((value: unknown, index: number) => unknown) | PropertyKey,
): (value: Record<PropertyKey, unknown>, index: number) => unknown {
  if (isFunction(mapper)) {
    return mapper;
  }

  if (!isPropertyKey(mapper)) {
    throw new TypeError("Expected a mapper function or a property name.");
  }

  return (value) => memberValue(value, mapper);
}

function* filterMapped<Input>(
  iterable: Iterable<Input>,
  predicate: ((value: Input, index: number) => unknown) | undefined,
  mapper: (value: Input, index: number) => unknown,
): Generator<unknown, undefined, unknown> {
  let index = 0;

  for (const value of iterable) {
    const current = index++;

    if (predicate != null && !predicate(value, current)) {
      continue;
    }

    const result = mapper(value, current);

    if (result !== undefined) {
      yield result;
    }
  }
}
