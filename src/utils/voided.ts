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

export function voided<Callable extends Callee>(
  callback: Callable,
): Voided<Callable> {
  const execute = resolveCallable(callback);

  return function (this, ...args) {
    execute.call(this, ...args);
  };
}
