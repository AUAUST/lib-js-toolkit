import { isString } from "#modules/string/guards/isString";
import { escapeRegExp } from "#modules/string/utils/escapeRegExp";
import type { Maybe } from "#types/Maybe";

/**
 * Keeps only the matches of `pattern`, a substring or a regex, joined in order.
 * A regex is cloned, so its `lastIndex` is neither read nor changed. Nullish
 * input is returned as is.
 */
export function retain(string: string, pattern: string | RegExp): string;
export function retain<Value extends null | undefined>(
  string: Value,
  pattern: string | RegExp,
): Value;
export function retain(
  string: Maybe<string>,
  pattern: string | RegExp,
): Maybe<string>;
export function retain(
  string: Maybe<string>,
  pattern: string | RegExp,
): Maybe<string> {
  if (string == null) {
    return string;
  }

  const regex = isString(pattern)
    ? new RegExp(escapeRegExp(pattern), "gu")
    : new RegExp(pattern, pattern.global ? pattern.flags : `${pattern.flags}g`);

  return string.match(regex)?.join("") ?? "";
}
