import { isContainer } from "#modules/guard/utils/isContainer";
import type { MethodName } from "#types/MethodName";

export function isFunction(
  candidate: unknown,
): candidate is (...args: unknown[]) => unknown;
export function isFunction<Target extends object>(
  candidate: Target,
  method: MethodName<Target>,
): boolean;
export function isFunction<Method extends PropertyKey>(
  candidate: unknown,
  method: Method,
): candidate is {
  [key in Method]: (...args: unknown[]) => unknown;
};
export function isFunction(candidate: unknown, method?: PropertyKey): boolean {
  if (method !== undefined) {
    return (
      isContainer(candidate) && typeof (candidate as any)[method] === "function"
    );
  }

  return typeof candidate === "function";
}
