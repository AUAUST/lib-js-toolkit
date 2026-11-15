import { toFunction } from "#modules/function/utils/toFunction";
import type { Callee } from "#types/Callee";
import type { CallParameters } from "#types/CallParameters";
import type { CallReturnType } from "#types/CallReturnType";
import type { CallThisParameterType } from "#types/CallThisParameterType";

/**
 * Returns a function calling `closure`, resolved once, with its receiver
 * and arguments, and returning `mapper` applied to the result as returned,
 * a promise included.
 */
export function mapReturn<Closure extends Callee, Result>(
  closure: Closure,
  mapper: (result: CallReturnType<Closure>) => Result,
): (
  this: CallThisParameterType<Closure>,
  ...args: CallParameters<Closure>
) => Result {
  const resolved = toFunction(closure);

  return function mapped(this: CallThisParameterType<Closure>, ...args) {
    return mapper(Reflect.apply(resolved, this, args));
  };
}
