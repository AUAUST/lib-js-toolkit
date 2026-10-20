import { resolveCallable } from "@auaust/toolkit/resolveCallable";
import type {
  Callee,
  CallParameters,
  CallThisParameterType,
} from "@auaust/toolkit/types";

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
  const execute = resolveCallable(callback);

  return function voided(this, ...args) {
    execute.call(this, ...args);
  };
}
