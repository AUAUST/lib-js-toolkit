import { assertMethod } from "#modules/assert/utils/assertMethod";
import type { MethodName } from "#types/MethodName";

/**
 * Returns the candidate when it has a function-valued property under `method`;
 * otherwise throws an `AssertionError`.
 */
export function ensureMethod<Target extends object>(
  candidate: Target,
  method: MethodName<Target>,
  message?: string,
): Target;
export function ensureMethod<Candidate, Method extends PropertyKey>(
  candidate: Candidate,
  method: Method,
  message?: string,
): Candidate & {
  [key in Method]: (...args: unknown[]) => unknown;
};
export function ensureMethod(
  candidate: unknown,
  method: PropertyKey,
  message?: string,
): unknown {
  assertMethod(candidate, method, message);

  return candidate;
}
