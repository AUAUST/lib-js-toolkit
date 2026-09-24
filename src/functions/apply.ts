import { implementsProtocol } from "@auaust/toolkit/protocols";
import { callable } from "@auaust/toolkit/protocols/callable";
import {
  type Callee,
  type CallParameters,
  type CallReturnType,
} from "@auaust/toolkit/types";

export interface Apply {
  <Target extends Callee<[]>>(
    this: unknown,
    target: Target,
    args?: CallParameters<Target>,
  ): CallReturnType<Target>;
  <Target extends Callee>(
    this: unknown,
    target: Target,
    args: CallParameters<Target>,
  ): CallReturnType<Target>;
  call<Target extends Callee<[]>>(
    thisArg: unknown,
    target: Target,
    args?: CallParameters<Target>,
  ): CallReturnType<Target>;
  call<Target extends Callee>(
    thisArg: unknown,
    target: Target,
    args: CallParameters<Target>,
  ): CallReturnType<Target>;
  apply<Target extends Callee<[]>>(
    thisArg: unknown,
    args: [target: Target, args?: CallParameters<Target>],
  ): CallReturnType<Target>;
  apply<Target extends Callee>(
    thisArg: unknown,
    args: [target: Target, args: CallParameters<Target>],
  ): CallReturnType<Target>;
}

export const apply: Apply = function apply(
  this: unknown,
  target: unknown,
  args: readonly unknown[] = [],
): unknown {
  const receiver = this === apply ? undefined : this;

  if (implementsProtocol(callable, target)) {
    return Reflect.apply(
      target[callable],
      receiver === undefined ? target : receiver,
      args,
    );
  }

  if (typeof target === "function") {
    return Reflect.apply(target, receiver, args);
  }

  throw new TypeError(`${String(target)} is not callable`);
} as Apply;
