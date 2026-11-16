import { assertMethod } from "#modules/assert/utils/assertMethod";
import type { MethodName } from "#types/MethodName";
import type { UnknownFn } from "#types/UnknownFn";

/**
 * Returns the candidate when it has a function-valued property under `method`.
 *
 * @throws {AssertionError} when the candidate has no function-valued property
 * under `method`.
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
  [key in Method]: UnknownFn;
};
export function ensureMethod(
  candidate: unknown,
  method: PropertyKey,
  message?: string,
): unknown {
  assertMethod(candidate, method, message);

  return candidate;
}
