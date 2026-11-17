import { toFunction } from "#modules/function/utils/toFunction";
import type { Callee } from "#types/Callee";
import type { CallParameters } from "#types/CallParameters";
import type { CallThisParameterType } from "#types/CallThisParameterType";

export type Voided<Closure extends Callee> = (
  this: CallThisParameterType<Closure>,
  ...args: CallParameters<Closure>
) => void;

/**
 * Returns the resolved `closure` as a function that ignores its return value.
 */
export function voided<Closure extends Callee>(
  closure: Closure,
): Voided<Closure> {
  const resolved = toFunction(closure);

  return function voided(this, ...args) {
    Reflect.apply(resolved, this, args);
  };
}
