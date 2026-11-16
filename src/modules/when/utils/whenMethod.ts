import { isMethod } from "#modules/function/guards/isMethod";
import { identity } from "#modules/general/utils/identity";
import { when } from "#modules/when/utils/when";
import type { WhenBranch } from "#modules/when/utils/createWhen";
import type { MethodName } from "#types/MethodName";
import type { UnknownFn } from "#types/UnknownFn";

/**
 * Resolves `whenTrue` when `isMethod` accepts the candidate with `method`,
 * otherwise `whenFalse`. An absent or `undefined` `whenTrue` resolves to the
 * candidate itself; an absent `whenFalse` to `undefined`.
 */
export function whenMethod<
  Target extends object,
  IfFalse = undefined,
  This = any,
>(
  this: This,
  candidate: Target,
  method: MethodName<Target>,
  whenTrue?: undefined,
  whenFalse?: WhenBranch<IfFalse, Target, This>,
): Target | IfFalse;
export function whenMethod<
  Target extends object,
  IfTrue,
  IfFalse = undefined,
  This = any,
>(
  this: This,
  candidate: Target,
  method: MethodName<Target>,
  whenTrue: WhenBranch<IfTrue, Target, This>,
  whenFalse?: WhenBranch<IfFalse, Target, This>,
): IfTrue | IfFalse;
export function whenMethod<
  Candidate,
  Method extends PropertyKey,
  IfFalse = undefined,
  This = any,
>(
  this: This,
  candidate: Candidate,
  method: Method,
  whenTrue?: undefined,
  whenFalse?: WhenBranch<IfFalse, Candidate, This>,
): (Candidate & { [key in Method]: UnknownFn }) | IfFalse;
export function whenMethod<
  Candidate,
  Method extends PropertyKey,
  IfTrue,
  IfFalse = undefined,
  This = any,
>(
  this: This,
  candidate: Candidate,
  method: Method,
  whenTrue: WhenBranch<
    IfTrue,
    Candidate & { [key in Method]: UnknownFn },
    This
  >,
  whenFalse?: WhenBranch<IfFalse, Candidate, This>,
): IfTrue | IfFalse;
export function whenMethod(
  this: unknown,
  candidate: unknown,
  method: PropertyKey,
  whenTrue?: unknown,
  whenFalse?: unknown,
): unknown {
  return when.call(
    this,
    (target: unknown) => isMethod(target, method),
    whenTrue ?? identity,
    whenFalse,
    candidate,
  );
}
