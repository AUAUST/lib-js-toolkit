import { isFunction } from "#modules/function/guards/isFunction";
import { isContainer } from "#modules/guard/guards/isContainer";
import { get } from "#modules/object/utils/get";
import type { MethodName } from "#types/MethodName";

/**
 * Checks for an object or function with a function-valued property, own or inherited, under `method`.
 * A candidate whose type declares the method keeps its type; any other narrows to an object holding the method.
 */
export function isMethod<Target extends object>(
  candidate: Target,
  method: MethodName<Target>,
): boolean;
export function isMethod<Method extends PropertyKey>(
  candidate: unknown,
  method: Method,
): candidate is {
  [key in Method]: (...args: unknown[]) => unknown;
};
export function isMethod(candidate: unknown, method: PropertyKey): boolean {
  return isContainer(candidate) && isFunction(get(candidate, method));
}
