import { implementsProtocol } from "@auaust/toolkit/protocols";
import { callable } from "@auaust/toolkit/protocols/callable";
import {
  type Callee,
  type CallParameters,
  type CallReturnType,
  type CallThisParameterType,
} from "@auaust/toolkit/types";

export interface Apply {
  <Target extends Callee<[]>>(
    this: CallThisParameterType<Target>,
    callback: Target,
    args?: CallParameters<Target>,
  ): CallReturnType<Target>;
  <Target extends Callee>(
    this: CallThisParameterType<Target>,
    callback: Target,
    args: CallParameters<Target>,
  ): CallReturnType<Target>;
  call<Target extends Callee<[]>>(
    thisArg: CallThisParameterType<Target>,
    callback: Target,
    args?: CallParameters<Target>,
  ): CallReturnType<Target>;
  call<Target extends Callee>(
    thisArg: CallThisParameterType<Target>,
    callback: Target,
    args: CallParameters<Target>,
  ): CallReturnType<Target>;
  apply<Target extends Callee<[]>>(
    thisArg: CallThisParameterType<Target>,
    args: [callback: Target, args?: CallParameters<Target>],
  ): CallReturnType<Target>;
  apply<Target extends Callee>(
    thisArg: CallThisParameterType<Target>,
    args: [callback: Target, args: CallParameters<Target>],
  ): CallReturnType<Target>;
}

export const apply: Apply = function apply(
  this: unknown,
  callback: unknown,
  args: readonly unknown[] = [],
): unknown {
  const receiver = this === apply ? undefined : this;

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
} as Apply;
