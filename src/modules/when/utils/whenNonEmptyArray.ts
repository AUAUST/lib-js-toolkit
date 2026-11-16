import { isNonEmptyArray } from "#modules/array/guards/isNonEmptyArray";
import { identity } from "#modules/general/utils/identity";
import { when } from "#modules/when/utils/when";
import type {
  WhenBranch,
  WhenGuarded,
  WhenRejected,
} from "#modules/when/utils/createWhen";

/**
 * Resolves `whenTrue` when `isNonEmptyArray` accepts the candidate,
 * otherwise `whenFalse`.
 */
export function whenNonEmptyArray<Item, IfFalse = undefined, This = any>(
  this: This,
  candidate: Item[],
  whenTrue?: undefined,
  whenFalse?: WhenBranch<IfFalse, Item[], This>,
): [Item, ...Item[]] | IfFalse;
export function whenNonEmptyArray<
  Item,
  IfTrue,
  IfFalse = undefined,
  This = any,
>(
  this: This,
  candidate: Item[],
  whenTrue: WhenBranch<IfTrue, [Item, ...Item[]], This>,
  whenFalse?: WhenBranch<IfFalse, Item[], This>,
): IfTrue | IfFalse;
export function whenNonEmptyArray<Item, IfFalse = undefined, This = any>(
  this: This,
  candidate: readonly Item[],
  whenTrue?: undefined,
  whenFalse?: WhenBranch<IfFalse, readonly Item[], This>,
): readonly [Item, ...Item[]] | IfFalse;
export function whenNonEmptyArray<
  Item,
  IfTrue,
  IfFalse = undefined,
  This = any,
>(
  this: This,
  candidate: readonly Item[],
  whenTrue: WhenBranch<IfTrue, readonly [Item, ...Item[]], This>,
  whenFalse?: WhenBranch<IfFalse, readonly Item[], This>,
): IfTrue | IfFalse;
export function whenNonEmptyArray<Candidate, IfFalse = undefined, This = any>(
  this: This,
  candidate: Candidate,
  whenTrue?: undefined,
  whenFalse?: WhenBranch<
    IfFalse,
    WhenRejected<Candidate, readonly [unknown, ...unknown[]]>,
    This
  >,
): WhenGuarded<Candidate, readonly [unknown, ...unknown[]]> | IfFalse;
export function whenNonEmptyArray<
  Candidate,
  IfTrue,
  IfFalse = undefined,
  This = any,
>(
  this: This,
  candidate: Candidate,
  whenTrue: WhenBranch<
    IfTrue,
    WhenGuarded<Candidate, readonly [unknown, ...unknown[]]>,
    This
  >,
  whenFalse?: WhenBranch<
    IfFalse,
    WhenRejected<Candidate, readonly [unknown, ...unknown[]]>,
    This
  >,
): IfTrue | IfFalse;
export function whenNonEmptyArray(
  this: unknown,
  candidate: unknown,
  whenTrue?: unknown,
  whenFalse?: unknown,
): unknown {
  return when.call(
    this,
    isNonEmptyArray,
    whenTrue ?? identity,
    whenFalse,
    candidate,
  );
}
