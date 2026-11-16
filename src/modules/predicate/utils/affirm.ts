import { toFunction } from "#modules/function/utils/toFunction";
import type { Callee } from "#types/Callee";
import type { CallParameters } from "#types/CallParameters";
import type { CallThisParameterType } from "#types/CallThisParameterType";

/**
 * Wraps `closure` as `function affirmed`, forwarding `this` and arguments
 * and returning the boolean of its result. A callable `closure` is
 * resolved once, here.
 *
 * @shorthand notnot
 */
export function affirm<Callback extends Callee>(
  closure: Callback,
): (
  this: CallThisParameterType<Callback>,
  ...args: CallParameters<Callback>
) => boolean;
export function affirm(closure: Callee): (...args: unknown[]) => boolean {
  const resolve = toFunction(closure);

  return function affirmed(this: unknown, ...args: unknown[]): boolean {
    return !!Reflect.apply(resolve, this, args);
  };
}
