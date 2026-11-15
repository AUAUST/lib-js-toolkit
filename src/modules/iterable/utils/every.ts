import { isFunction } from "#modules/function/guards/isFunction";
import { memberValue } from "#modules/general/utils/memberValue";
import { isPropertyKey } from "#modules/guard/guards/isPropertyKey";
import { isIterable } from "#modules/iterable/guards/isIterable";
import type { BivariantTypeGuard } from "#types/BivariantTypeGuard";
import type { Maybe } from "#types/Maybe";

// @debt The implementation signature types values as records so `memberValue` accepts any property key; the overloads hold the real contract.

// @debt The type-predicate overload narrows the source, although a consumed single-use iterator yields nothing more to narrow.

// @debt A nullish-accepting source loses the type-predicate overload, since a type predicate cannot return `undefined`.

/**
 * Tells whether the predicate accepts every value of an iterable, reading no
 * further and closing the source once one is rejected. The predicate receives
 * each value with its index; a type predicate narrows the source. A property
 * name instead accepts the values whose member is truthy, calling it when it is
 * a method; a union value type accepts only a name every member has. An empty
 * source gives `true`; a nullish source returns `undefined`.
 *
 * @throws {TypeError} when the source is not iterable or the predicate is neither
 * a function nor a property key.
 * @native variant Iterator.prototype.every
 */
export function every<Input, Output extends Input>(
  iterable: Iterable<Input>,
  predicate: (value: NoInfer<Input>, index: number) => value is Output,
): iterable is Iterable<Output>;
export function every<Input, Guarded>(
  iterable: Iterable<Input>,
  predicate: BivariantTypeGuard<Guarded>,
): iterable is Iterable<Extract<Input, Guarded>>;
export function every<Input>(
  iterable: Iterable<Input>,
  predicate: ((value: Input, index: number) => unknown) | keyof Input,
): boolean;
export function every<Input>(
  iterable: Maybe<Iterable<Input>>,
  predicate: ((value: Input, index: number) => unknown) | keyof Input,
): boolean | undefined;
export function every(
  iterable: Maybe<Iterable<Record<PropertyKey, unknown>>>,
  predicate: ((value: unknown, index: number) => unknown) | PropertyKey,
): boolean | undefined {
  if (iterable == null) {
    return;
  }

  if (!isIterable(iterable)) {
    throw new TypeError("Expected an iterable.");
  }

  if (isFunction(predicate)) {
    return acceptsAll(iterable, predicate);
  }

  if (!isPropertyKey(predicate)) {
    throw new TypeError("Expected a predicate function or a property name.");
  }

  return acceptsAll(iterable, (value) => memberValue(value, predicate));
}

function acceptsAll<Input>(
  iterable: Iterable<Input>,
  predicate: (value: Input, index: number) => unknown,
): boolean {
  let index = 0;

  for (const value of iterable) {
    if (!predicate(value, index++)) {
      return false;
    }
  }

  return true;
}
