import { assertCallableMember } from "#modules/assert/utils/assertCallableMember";
import type { Callee } from "#types/Callee";
import type { MethodName } from "#types/MethodName";

/**
 * Returns the candidate when it has a callable property under `member`; otherwise
 * throws an `AssertionError`.
 */
export function ensureCallableMember<Target extends object>(
  candidate: Target,
  member: MethodName<Target>,
  message?: string,
): Target;
export function ensureCallableMember<Candidate, Member extends PropertyKey>(
  candidate: Candidate,
  member: Member,
  message?: string,
): Candidate & {
  [key in Member]: Callee;
};
export function ensureCallableMember(
  candidate: unknown,
  member: PropertyKey,
  message?: string,
): unknown {
  assertCallableMember(candidate, member, message);

  return candidate;
}
