import { isCallable } from "#modules/function/utils/isCallable";
import { apply } from "#utils/apply";
import type { Callee } from "#types/Callee";
import type { CallParameters } from "#types/CallParameters";
import type { CallReturnType } from "#types/CallReturnType";
import type { MethodName } from "#types/MethodName";
import type { MethodParameters } from "#types/MethodParameters";
import type { MethodReturnType } from "#types/MethodReturnType";
import type { NullaryMethodName } from "#types/NullaryMethodName";

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
  Method extends Callee<any, any, Target>,
>(
  target: Target,
  method: Method,
  args: CallParameters<Method>,
): CallReturnType<Method>;
export function applyMethod(
  target: Record<PropertyKey, any>,
  method: PropertyKey | Callee,
  args: any,
): unknown {
  return apply.call(target, isCallable(method) ? method : target[method], args);
}
