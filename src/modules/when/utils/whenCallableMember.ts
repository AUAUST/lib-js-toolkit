import { isCallableMember } from "#modules/function/guards/isCallableMember";
import { identity } from "#modules/general/utils/identity";
import { when } from "#modules/when/utils/when";
import type { WhenBranch } from "#modules/when/utils/createWhen";
import type { Callee } from "#types/Callee";
import type { MethodName } from "#types/MethodName";

/**
 * Resolves `whenTrue` when `isCallableMember` accepts the candidate with `member`,
 * otherwise `whenFalse`. An absent or `undefined` `whenTrue` resolves to the
 * candidate itself; an absent `whenFalse` to `undefined`.
 */
export function whenCallableMember<
  Target extends object,
  IfFalse = undefined,
  This = any,
>(
  this: This,
  candidate: Target,
  member: MethodName<Target>,
  whenTrue?: undefined,
  whenFalse?: WhenBranch<IfFalse, Target, This>,
): Target | IfFalse;
export function whenCallableMember<
  Target extends object,
  IfTrue,
  IfFalse = undefined,
  This = any,
>(
  this: This,
  candidate: Target,
  member: MethodName<Target>,
  whenTrue: WhenBranch<IfTrue, Target, This>,
  whenFalse?: WhenBranch<IfFalse, Target, This>,
): IfTrue | IfFalse;
export function whenCallableMember<
  Candidate,
  Member extends PropertyKey,
  IfFalse = undefined,
  This = any,
>(
  this: This,
  candidate: Candidate,
  member: Member,
  whenTrue?: undefined,
  whenFalse?: WhenBranch<IfFalse, Candidate, This>,
): (Candidate & { [key in Member]: Callee }) | IfFalse;
export function whenCallableMember<
  Candidate,
  Member extends PropertyKey,
  IfTrue,
  IfFalse = undefined,
  This = any,
>(
  this: This,
  candidate: Candidate,
  member: Member,
  whenTrue: WhenBranch<IfTrue, Candidate & { [key in Member]: Callee }, This>,
  whenFalse?: WhenBranch<IfFalse, Candidate, This>,
): IfTrue | IfFalse;
export function whenCallableMember(
  this: unknown,
  candidate: unknown,
  member: PropertyKey,
  whenTrue?: unknown,
  whenFalse?: unknown,
): unknown {
  return when.call(
    this,
    (target: unknown) => isCallableMember(target, member),
    whenTrue ?? identity,
    whenFalse,
    candidate,
  );
}
