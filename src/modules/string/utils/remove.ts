import { isString } from "#modules/string/guards/isString";
import { toGlobalRegExp } from "#modules/string/internals/toGlobalRegExp";
import type { Maybe } from "#types/Maybe";

/**
 * Removes every match of `pattern`, a substring or a regex applied as global
 * even without the `g` flag. A nullish string returns `undefined`.
 *
 * @native variant String.prototype.replaceAll
 */
export function remove(string: string, pattern: string | RegExp): string;
export function remove(
  string: null | undefined,
  pattern: string | RegExp,
): undefined;
export function remove(
  string: Maybe<string>,
  pattern: string | RegExp,
): string | undefined;
export function remove(
  string: Maybe<string>,
  pattern: string | RegExp,
): string | undefined {
  if (string != null) {
    return string.replaceAll(
      isString(pattern) ? pattern : toGlobalRegExp(pattern),
      "",
    );
  }
}
