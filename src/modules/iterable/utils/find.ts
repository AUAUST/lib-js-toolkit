import { isFunction } from "#modules/function/guards/isFunction";
import { memberValue } from "#modules/general/utils/memberValue";
import { isPropertyKey } from "#modules/guard/guards/isPropertyKey";
import { isIterable } from "#modules/iterable/guards/isIterable";
import type { BivariantTypeGuard } from "#types/BivariantTypeGuard";
import type { Maybe } from "#types/Maybe";

// @debt The implementation signature types values as records so `memberValue` accepts any property key; the overloads hold the real contract.

/**
 * Returns the first value of an iterable the predicate accepts, or `undefined`
 * when none does, reading no further and closing the source once found. The
 * predicate receives each value with its index; a type predicate narrows the
 * result. A property name instead accepts the first value whose member is truthy,
 * calling it when it is a method; a union value type accepts only a name every
 * member has. A nullish source returns `undefined`.
 *
 * @throws {TypeError} when the source is not iterable or the predicate is neither
 * a function nor a property key.
 * @native variant Iterator.prototype.find
 */
export function find<Input, Output extends Input>(
  iterable: Maybe<Iterable<Input>>,
  predicate: (value: NoInfer<Input>, index: number) => value is Output,
): Output | undefined;
export function find<Input, Guarded>(
  iterable: Maybe<Iterable<Input>>,
  predicate: BivariantTypeGuard<Guarded>,
): Extract<Input, Guarded> | undefined;
export function find<Input>(
  iterable: Maybe<Iterable<Input>>,
  predicate: ((value: Input, index: number) => unknown) | keyof Input,
): Input | undefined;
export function find(
  iterable: Maybe<Iterable<Record<PropertyKey, unknown>>>,
  predicate: ((value: unknown, index: number) => unknown) | PropertyKey,
): unknown {
  if (iterable == null) {
    return;
  }

  if (!isIterable(iterable)) {
    throw new TypeError("Expected an iterable.");
  }

  if (isFunction(predicate)) {
    return findValue(iterable, predicate);
  }

  if (!isPropertyKey(predicate)) {
    throw new TypeError("Expected a predicate function or a property name.");
  }

  return findValue(iterable, (value) => memberValue(value, predicate));
}

function findValue<Input>(
  iterable: Iterable<Input>,
  predicate: (value: Input, index: number) => unknown,
): Input | undefined {
  let index = 0;

  for (const value of iterable) {
    if (predicate(value, index++)) {
      return value;
    }
  }
}
