import type { Maybe } from "#types/Maybe";

/**
 * Surrounds the string with `around` on both sides, or with `before` and `after`.
 * A nullish string returns `undefined`.
 */
export function wrap(string: string, around: string): string;
export function wrap(string: string, before: string, after: string): string;
export function wrap(string: null | undefined, around: string): undefined;
export function wrap(
  string: null | undefined,
  before: string,
  after: string,
): undefined;
export function wrap(string: Maybe<string>, around: string): string | undefined;
export function wrap(
  string: Maybe<string>,
  before: string,
  after: string,
): string | undefined;
export function wrap(
  string: Maybe<string>,
  before: string,
  after: string = before,
): string | undefined {
  if (string != null) {
    return before + string + after;
  }
}
