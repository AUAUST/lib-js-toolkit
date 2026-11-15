import { toFunction } from "#modules/function/utils/toFunction";
import type { Callee } from "#types/Callee";
import type { CallParameters } from "#types/CallParameters";
import type { CallReturnType } from "#types/CallReturnType";
import type { CallThisParameterType } from "#types/CallThisParameterType";

/**
 * Returns a function passing its arguments through `mapper` before calling
 * `closure`, resolved once, with the returned function's receiver.
 */
export function mapArguments<
  Closure extends Callee,
  Arguments extends readonly any[],
>(
  closure: Closure,
  mapper: (...args: Arguments) => CallParameters<Closure>,
): (
  this: CallThisParameterType<Closure>,
  ...args: Arguments
) => CallReturnType<Closure> {
  const resolved = toFunction(closure);

  return function mapped(this: CallThisParameterType<Closure>, ...args) {
    return Reflect.apply(resolved, this, mapper(...args));
  };
}
