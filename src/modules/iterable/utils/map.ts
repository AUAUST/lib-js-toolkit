import { isFunction } from "#modules/function/guards/isFunction";
import { callMethod } from "#modules/function/utils/callMethod";
import { isPropertyKey } from "#modules/guard/guards/isPropertyKey";
import { isIterable } from "#modules/iterable/guards/isIterable";
import type { Maybe } from "#types/Maybe";
import type { MethodName } from "#types/MethodName";
import type { MethodParameters } from "#types/MethodParameters";
import type { MethodReturnType } from "#types/MethodReturnType";

// @debt The implementation signature types items as method holders so `callMethod` accepts any property key; the overloads hold the real contract.
type MethodHolder = Record<
  PropertyKey,
  (...args: readonly unknown[]) => unknown
>;

/**
 * Lazily maps each value of an iterable, passing it with its index; returns a new
 * single-use iterator and never mutates the source. A method name instead calls
 * that method on each value with the given arguments; a union value type accepts
 * only a name every member has. The source is read lazily: changes made to it
 * before a value is pulled are visible. A nullish source returns `undefined`.
 *
 * @throws {TypeError} at call time when the source is not iterable or the mapper
 * is neither a function nor a property key.
 * @native variant Iterator.prototype.map
 */
export function map<Input, Output>(
  iterable: Iterable<Input>,
  mapper: (value: Input, index: number) => Output,
): IteratorObject<Output, undefined>;
export function map<Input, const Name extends MethodName<Input>>(
  iterable: Iterable<Input>,
  method: Name,
  ...args: MethodParameters<Input, Name>
): IteratorObject<MethodReturnType<Input, Name>, undefined>;
export function map<Input, Output>(
  iterable: Maybe<Iterable<Input>>,
  mapper: (value: Input, index: number) => Output,
): IteratorObject<Output, undefined> | undefined;
export function map<Input, const Name extends MethodName<Input>>(
  iterable: Maybe<Iterable<Input>>,
  method: Name,
  ...args: MethodParameters<Input, Name>
): IteratorObject<MethodReturnType<Input, Name>, undefined> | undefined;
export function map(
  iterable: Maybe<Iterable<MethodHolder>>,
  mapper: ((value: unknown, index: number) => unknown) | PropertyKey,
  ...args: readonly unknown[]
): IteratorObject<unknown, undefined> | undefined {
  if (iterable == null) {
    return;
  }

  if (!isIterable(iterable)) {
    throw new TypeError("Expected an iterable.");
  }

  if (isFunction(mapper)) {
    return mapped(iterable, mapper);
  }

  if (!isPropertyKey(mapper)) {
    throw new TypeError("Expected a mapper function or a method name.");
  }

  return mapped(iterable, (value) => callMethod(value, mapper, ...args));
}

function* mapped<Input, Output>(
  iterable: Iterable<Input>,
  mapper: (value: Input, index: number) => Output,
): Generator<Output, undefined, unknown> {
  let index = 0;

  for (const value of iterable) {
    yield mapper(value, index++);
  }
}
