import { AssertionError } from "#errors/AssertionError";
import { isCallableMember } from "#modules/function/guards/isCallableMember";
import type { Callee } from "#types/Callee";
import type { MethodName } from "#types/MethodName";

/**
 * @throws {AssertionError} unless the candidate has a callable property under `member`; narrows it in place.
 */
export function assertCallableMember<Target extends object>(
  candidate: Target,
  member: MethodName<Target>,
  message?: string,
): void;
export function assertCallableMember<Member extends PropertyKey>(
  candidate: unknown,
  member: Member,
  message?: string,
): asserts candidate is {
  [key in Member]: Callee;
};
export function assertCallableMember(
  candidate: unknown,
  member: PropertyKey,
  message = "Expected a callable member.",
): void {
  if (!isCallableMember(candidate, member)) {
    throw new AssertionError(message);
  }
}
