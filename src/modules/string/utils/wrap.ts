import type { Maybe } from "#types/Maybe";

/**
 * Surrounds the string with `around` on both sides, or with `before` and `after`.
 * Nullish input is returned as is.
 */
export function wrap(string: string, around: string): string;
export function wrap(string: string, before: string, after: string): string;
export function wrap<Value extends null | undefined>(
  string: Value,
  around: string,
): Value;
export function wrap<Value extends null | undefined>(
  string: Value,
  before: string,
  after: string,
): Value;
export function wrap(string: Maybe<string>, around: string): Maybe<string>;
export function wrap(
  string: Maybe<string>,
  before: string,
  after: string,
): Maybe<string>;
export function wrap(
  string: Maybe<string>,
  before: string,
  after: string = before,
): Maybe<string> {
  if (string == null) {
    return string;
  }

  return before + string + after;
}
