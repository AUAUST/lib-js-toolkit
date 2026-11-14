import { isCallable } from "#modules/function/guards/isCallable";
import { isContainer } from "#modules/guard/guards/isContainer";
import { get } from "#modules/object/utils/get";
import type { Callee } from "#types/Callee";
import type { MethodName } from "#types/MethodName";

/**
 * Checks for an object or function with a callable property, own or inherited,
 * under `member`. A candidate whose type declares the method keeps its type; any
 * other narrows to an object holding the callable.
 */
export function isCallableMember<Target extends object>(
  candidate: Target,
  member: MethodName<Target>,
): boolean;
export function isCallableMember<Member extends PropertyKey>(
  candidate: unknown,
  member: Member,
): candidate is {
  [key in Member]: Callee;
};
export function isCallableMember(
  candidate: unknown,
  member: PropertyKey,
): boolean {
  return isContainer(candidate) && isCallable(get(candidate, member));
}
