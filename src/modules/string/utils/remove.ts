import { isString } from "#modules/string/guards/isString";
import type { Maybe } from "#types/Maybe";

/**
 * Removes every match of `pattern`, a substring or a regex applied as global
 * even without the `g` flag. Nullish input is returned as is.
 *
 * @native variant String.prototype.replaceAll
 */
export function remove(string: string, pattern: string | RegExp): string;
export function remove<Value extends null | undefined>(
  string: Value,
  pattern: string | RegExp,
): Value;
export function remove(
  string: Maybe<string>,
  pattern: string | RegExp,
): Maybe<string>;
export function remove(
  string: Maybe<string>,
  pattern: string | RegExp,
): Maybe<string> {
  if (string == null) {
    return string;
  }

  if (isString(pattern) || pattern.global) {
    return string.replaceAll(pattern, "");
  }

  return string.replaceAll(new RegExp(pattern, `${pattern.flags}g`), "");
}
