import { apply } from "@auaust/toolkit/apply";
import { isCallable } from "@auaust/toolkit/isCallable";
import type {
  Callee,
  IfNever,
  MethodName,
  MethodParameters,
  MethodReturnType,
} from "@auaust/toolkit/types";

export type MemberValue<
  T extends object,
  K extends keyof T,
> = T[K] extends infer M ? (M extends Callee<any, infer R> ? R : M) : never;

export function memberValue<T extends object, const Name extends keyof T>(
  target: T,
  property: Name,
  ...args: IfNever<MethodParameters<T, Name>, []>
): MemberValue<T, Name>;
export function memberValue<T extends object, const Name extends MethodName<T>>(
  target: T,
  method: Name,
  ...name: MethodParameters<T, Name>
): MethodReturnType<T, Name>;
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
