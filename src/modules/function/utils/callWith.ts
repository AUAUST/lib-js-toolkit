import { applyWith } from "#modules/function/utils/applyWith";
import type { Callee } from "#types/Callee";
import type { CallParameters } from "#types/CallParameters";
import type { CallReturnType } from "#types/CallReturnType";
import type { CallThisParameterType } from "#types/CallThisParameterType";

/**
 * Calls `callback` with `thisArg` and the rest `args`, like `applyWith`.
 *
 * @throws {TypeError} when `callback` is not callable.
 */
export function callWith<Target extends Callee>(
  callback: Target,
  thisArg: CallThisParameterType<Target>,
  ...args: CallParameters<Target>
): CallReturnType<Target> {
  return applyWith(callback, thisArg, args);
}
