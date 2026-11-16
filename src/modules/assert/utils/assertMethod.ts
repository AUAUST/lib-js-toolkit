import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isMethod } from "#modules/function/guards/isMethod";
import type { MethodName } from "#types/MethodName";
import type { UnknownFn } from "#types/UnknownFn";

/**
 * @throws {AssertionError} unless the candidate has a function-valued property
 * under `method`; narrows it in place.
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
  [key in Method]: UnknownFn;
};
export function assertMethod(
  candidate: unknown,
  method: PropertyKey,
  message?: string,
): void {
  if (!isMethod(candidate, method)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected a method", candidate),
    );
  }
}
