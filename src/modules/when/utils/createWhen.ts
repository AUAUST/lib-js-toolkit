import { identity } from "#modules/general/utils/identity";
import { when } from "#modules/when/utils/when";
import type { ResolvableValue } from "#modules/general/utils/value";

/**
 * The part of `Candidate` a guard narrowing to `Guarded` accepts, `Guarded` when
 * no part of the candidate is.
 */
export type WhenGuarded<Candidate, Guarded> = [
  Extract<Candidate, Guarded>,
] extends [never]
  ? [Candidate & Guarded] extends [never]
    ? Guarded
    : Candidate & Guarded
  : Extract<Candidate, Guarded>;

/**
 * The part of `Candidate` a guard narrowing to `Guarded` rejects, `unknown` when
 * the candidate is wholly guarded.
 */
export type WhenRejected<Candidate, Guarded> = [
  Exclude<Candidate, Guarded>,
] extends [never]
  ? unknown
  : Exclude<Candidate, Guarded>;

/**
 * A branch of a conditional: a value, or a callee resolved with the candidate.
 */
export type WhenBranch<Result, Candidate, This = any> = ResolvableValue<
  Result,
  [candidate: Candidate],
  This
>;

/**
 * A conditional built by `createWhen`, forwarding its `this` to the guard
 * and to both branches.
 */
export interface Conditional<Guarded> {
  <Candidate, IfFalse = undefined, This = any>(
    this: This,
    candidate: Candidate,
    whenTrue?: undefined,
    whenFalse?: WhenBranch<IfFalse, WhenRejected<Candidate, Guarded>, This>,
  ): WhenGuarded<Candidate, Guarded> | IfFalse;
  <Candidate, IfTrue, IfFalse = undefined, This = any>(
    this: This,
    candidate: Candidate,
    whenTrue: WhenBranch<IfTrue, WhenGuarded<Candidate, Guarded>, This>,
    whenFalse?: WhenBranch<IfFalse, WhenRejected<Candidate, Guarded>, This>,
  ): IfTrue | IfFalse;
}

/**
 * Builds a conditional resolving `whenTrue` with the candidate when `guard`
 * accepts it, otherwise `whenFalse`. An absent or `undefined` `whenTrue` resolves
 * to the candidate itself; an absent `whenFalse` to `undefined`.
 */
export function createWhen<Guarded>(
  guard: (candidate: any) => candidate is Guarded,
): Conditional<Guarded> {
  return function conditional(
    this: unknown,
    candidate: unknown,
    whenTrue?: unknown,
    whenFalse?: unknown,
  ): unknown {
    return when.call(this, guard, whenTrue ?? identity, whenFalse, candidate);
  };
}
