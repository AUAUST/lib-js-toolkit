import { apply } from "@auaust/toolkit/apply";
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
  Return,
  Argument extends readonly any[],
>(
  target: Target,
  callback: Callee<Return, Argument, Target>,
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
export function callMethod(target: any, method: any, ...args: any): unknown {
  return apply.call(target, isCallable(method) ? method : target[method], args);
}
