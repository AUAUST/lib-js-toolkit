import { callable } from "#modules/protocol/symbols";
import { implementsProtocol } from "#modules/protocol/utils/implementsProtocol";
import { isFunction } from "#utils/isFunction";
import type { Callee } from "#types/Callee";
import type { CallParameters } from "#types/CallParameters";
import type { CallReturnType } from "#types/CallReturnType";
import type { CallThisParameterType } from "#types/CallThisParameterType";

export interface Apply {
  <Target extends Callee<any, readonly []>>(
    this: CallThisParameterType<Target>,
    callback: Target,
    args?: CallParameters<Target>,
  ): CallReturnType<Target>;
  <Target extends Callee>(
    this: CallThisParameterType<Target>,
    callback: Target,
    args: CallParameters<Target>,
  ): CallReturnType<Target>;
  call<Target extends Callee<any, readonly []>>(
    thisArg: CallThisParameterType<Target>,
    callback: Target,
    args?: CallParameters<Target>,
  ): CallReturnType<Target>;
  call<Target extends Callee>(
    thisArg: CallThisParameterType<Target>,
    callback: Target,
    args: CallParameters<Target>,
  ): CallReturnType<Target>;
  apply<Target extends Callee<any, readonly []>>(
    thisArg: CallThisParameterType<Target>,
    args: readonly [callback: Target, args?: CallParameters<Target>],
  ): CallReturnType<Target>;
  apply<Target extends Callee>(
    thisArg: CallThisParameterType<Target>,
    args: readonly [callback: Target, args: CallParameters<Target>],
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

  if (isFunction(callback)) {
    return Reflect.apply(callback, receiver, args);
  }

  throw new TypeError(`${String(callback)} is not callable`);
};
