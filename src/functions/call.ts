import { implementsProtocol } from "@auaust/toolkit/protocols";
import { callable } from "@auaust/toolkit/protocols/callable";
import type {
  Callee,
  CallParameters,
  CallReturnType,
  CallThisParameterType,
} from "@auaust/toolkit/types";

export interface Call {
  <Target extends Callee>(
    this: CallThisParameterType<Target>,
    callback: Target,
    ...args: CallParameters<Target>
  ): CallReturnType<Target>;
  call<Target extends Callee>(
    thisArg: CallThisParameterType<Target>,
    callback: Target,
    ...args: CallParameters<Target>
  ): CallReturnType<Target>;
  apply<Target extends Callee>(
    thisArg: CallThisParameterType<Target>,
    args: [callback: Target, ...args: CallParameters<Target>],
  ): CallReturnType<Target>;
}

export const call: Call = function call(
  this: unknown,
  callback: unknown,
  ...args: unknown[]
): unknown {
  const receiver = this === call ? undefined : this;

  if (implementsProtocol(callable, callback)) {
    return Reflect.apply(
      callback[callable],
      receiver === undefined ? callback : receiver,
      args,
    );
  }

  if (typeof callback === "function") {
    return Reflect.apply(callback, receiver, args);
  }

  throw new TypeError(`${String(callback)} is not callable`);
} as Call;
