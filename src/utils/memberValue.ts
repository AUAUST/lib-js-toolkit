import { isCallable } from "#modules/function/utils/isCallable";
import { apply } from "#utils/apply";
import type { Callee } from "#types/Callee";
import type { IfNever } from "#types/IfNever";
import type { MethodName } from "#types/MethodName";
import type { MethodParameters } from "#types/MethodParameters";
import type { MethodReturnType } from "#types/MethodReturnType";

export type MemberValue<
  Target extends object,
  Name extends keyof Target,
> = Target[Name] extends infer M ? (M extends Callee<infer R> ? R : M) : never;

export function memberValue<
  Target extends object,
  const Name extends keyof Target,
>(
  target: Target,
  property: Name,
  ...args: IfNever<MethodParameters<Target, Name>, []>
): MemberValue<Target, Name>;
export function memberValue<
  Target extends object,
  const Name extends MethodName<Target>,
>(
  target: Target,
  method: Name,
  ...name: MethodParameters<Target, Name>
): MethodReturnType<Target, Name>;
export function memberValue(
  target: any,
  property: PropertyKey,
  ...args: any[]
): unknown {
  if (target == null) {
    return undefined;
  }

  const value = target[property];

  if (isCallable(value)) {
    return apply.call(target, value, args);
  }

  return value;
}
