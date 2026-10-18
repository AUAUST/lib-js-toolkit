import { resolveCallable } from "@auaust/toolkit/resolveCallable";
import type {
  Callee,
  CallParameters,
  CallThisParameterType,
} from "@auaust/toolkit/types";

export type Voided<Implementation extends Callee> = (
  this: CallThisParameterType<Implementation>,
  ...args: CallParameters<Implementation>
) => void;

export function voided<Callable extends Callee>(
  callback: Callable,
): Voided<Callable> {
  const callable = resolveCallable(callback);

  return function (this, ...args) {
    callable.call(this, ...args);
  };
}
