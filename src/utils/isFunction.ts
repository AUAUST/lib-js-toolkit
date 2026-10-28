import { isContainer } from "@auaust/toolkit/isContainer";
import type { MethodName } from "@auaust/toolkit/types";

export function isFunction(
  value: unknown,
): value is (...args: unknown[]) => unknown;
export function isFunction<Target extends object>(
  target: Target,
  method: MethodName<Target>,
): boolean;
export function isFunction<Method extends PropertyKey>(
  target: unknown,
  method: Method,
): target is {
  [key in Method]: (...args: unknown[]) => unknown;
};
export function isFunction(value: unknown, method?: PropertyKey): boolean {
  if (method !== undefined) {
    return isContainer(value) && typeof (value as any)[method] === "function";
  }

  return typeof value === "function";
}
