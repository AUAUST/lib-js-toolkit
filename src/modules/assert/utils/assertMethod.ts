import { AssertionError } from "#errors/AssertionError";
import { isMethod } from "#modules/function/guards/isMethod";
import type { MethodName } from "#types/MethodName";

/**
 * @throws {AssertionError} unless the candidate has a function-valued property under `method`; narrows it in place.
 */
export function assertMethod<Target extends object>(
  candidate: Target,
  method: MethodName<Target>,
  message?: string,
): void;
export function assertMethod<Method extends PropertyKey>(
  candidate: unknown,
  method: Method,
  message?: string,
): asserts candidate is {
  [key in Method]: (...args: unknown[]) => unknown;
};
export function assertMethod(
  candidate: unknown,
  method: PropertyKey,
  message = "Expected a method.",
): void {
  if (!isMethod(candidate, method)) {
    throw new AssertionError(message);
  }
}
