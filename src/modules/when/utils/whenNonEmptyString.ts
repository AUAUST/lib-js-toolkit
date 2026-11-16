import { identity } from "#modules/general/utils/identity";
import { isNonEmptyString } from "#modules/string/guards/isNonEmptyString";
import { when } from "#modules/when/utils/when";
import type {
  WhenBranch,
  WhenGuarded,
  WhenRejected,
} from "#modules/when/utils/createWhen";
import type { NonEmptyString } from "#types/NonEmptyString";

/**
 * Resolves `whenTrue` when `isNonEmptyString` accepts the candidate,
 * otherwise `whenFalse`.
 */
export function whenNonEmptyString<Candidate, IfFalse = undefined, This = any>(
  this: This,
  candidate: Candidate,
  whenTrue?: undefined,
  whenFalse?: WhenBranch<
    IfFalse,
    WhenRejected<Candidate, NonEmptyString<Candidate & string>>,
    This
  >,
): WhenGuarded<Candidate, NonEmptyString<Candidate & string>> | IfFalse;
export function whenNonEmptyString<
  Candidate,
  IfTrue,
  IfFalse = undefined,
  This = any,
>(
  this: This,
  candidate: Candidate,
  whenTrue: WhenBranch<
    IfTrue,
    WhenGuarded<Candidate, NonEmptyString<Candidate & string>>,
    This
  >,
  whenFalse?: WhenBranch<
    IfFalse,
    WhenRejected<Candidate, NonEmptyString<Candidate & string>>,
    This
  >,
): IfTrue | IfFalse;
export function whenNonEmptyString(
  this: unknown,
  candidate: unknown,
  whenTrue?: unknown,
  whenFalse?: unknown,
): unknown {
  return when.call(
    this,
    isNonEmptyString,
    whenTrue ?? identity,
    whenFalse,
    candidate,
  );
}
