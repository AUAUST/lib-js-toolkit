import { call } from "@auaust/toolkit/call";
import { isCallable } from "@auaust/toolkit/isCallable";
import type {
  Callee,
  CallParameters,
  CallReturnType,
  MethodName,
  MethodParameters,
  MethodReturnType,
  NullaryMethodName,
} from "@auaust/toolkit/types";

export function applyMethod<
  Target extends object,
  const Key extends NullaryMethodName<Target>,
>(
  target: Target,
  method: Key,
  args?: MethodParameters<Target, Key>,
): MethodReturnType<Target, Key>;
export function applyMethod<
  Target extends object,
  const Key extends MethodName<Target>,
>(
  target: Target,
  method: Key,
  args: MethodParameters<Target, Key>,
): MethodReturnType<Target, Key>;
export function applyMethod<
  Target extends object,
  Argument extends readonly any[],
  Return,
>(
  target: Target,
  callback: Callee<Argument, Return, Target>,
  args: Argument,
): Return;
export function applyMethod<
  Target extends object,
  Method extends Callee<any, any, Target>,
>(
  target: Target,
  method: Method,
  args: CallParameters<Method>,
): CallReturnType<Method>;
export function applyMethod(target: any, method: any, args: any = []): unknown {
  return call.call(
    target,
    isCallable(method) ? method : target[method],
    ...args,
  );
}
