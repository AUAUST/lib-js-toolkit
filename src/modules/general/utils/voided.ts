import { toFunction } from "#modules/function/utils/toFunction";
import type { Callee } from "#types/Callee";
import type { CallParameters } from "#types/CallParameters";
import type { CallThisParameterType } from "#types/CallThisParameterType";

export type Voided<Callback extends Callee> = (
  this: CallThisParameterType<Callback>,
  ...args: CallParameters<Callback>
) => void;

/**
 * Returns the resolved callable input as a function that ignores its return value.
 */
export function voided<Callable extends Callee>(
  callback: Callable,
): Voided<Callable> {
  const execute = toFunction(callback);

  return function voided(this, ...args) {
    execute.call(this, ...args);
  };
}
