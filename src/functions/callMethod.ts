import { call } from "@auaust/toolkit/call";
import { isCallable } from "@auaust/toolkit/isCallable";
import type {
  Callee,
  CallParameters,
  CallReturnType,
  MethodName,
  MethodParameters,
  MethodReturnType,
} from "@auaust/toolkit/types";

export function callMethod<
  Target extends object,
  const Key extends MethodName<Target>,
>(
  target: Target,
  method: Key,
  ...args: MethodParameters<Target, Key>
): MethodReturnType<Target, Key>;
export function callMethod<
  Target extends object,
  Argument extends readonly any[],
  Return,
>(
  target: Target,
  callback: Callee<Argument, Return, Target>,
  ...args: Argument
): Return;
export function callMethod<
  Target extends object,
  Method extends Callee<any, any, Target>,
>(
  target: Target,
  callback: Method,
  ...args: CallParameters<Method>
): CallReturnType<Method>;
export function callMethod(target: any, callback: any, ...args: any): unknown {
  return call.call(
    target,
    isCallable(callback) ? callback : target[callback],
    ...args,
  );
}
