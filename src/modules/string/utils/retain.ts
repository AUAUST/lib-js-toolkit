import { join } from "#modules/array/utils/join";
import { isString } from "#modules/string/guards/isString";
import { toGlobalRegExp } from "#modules/string/internals/toGlobalRegExp";
import { escapeRegExp } from "#modules/string/utils/escapeRegExp";
import type { Maybe } from "#types/Maybe";

/**
 * Keeps only the matches of `pattern`, a substring or a regex, joined in order.
 * A regex is cloned, so its `lastIndex` is neither read nor changed. A nullish
 * string returns `undefined`.
 */
export function retain(string: string, pattern: string | RegExp): string;
export function retain(
  string: null | undefined,
  pattern: string | RegExp,
): undefined;
export function retain(
  string: Maybe<string>,
  pattern: string | RegExp,
): string | undefined;
export function retain(
  string: Maybe<string>,
  pattern: string | RegExp,
): string | undefined {
  if (string == null) {
    return;
  }

  const regex = toGlobalRegExp(
    isString(pattern) ? new RegExp(escapeRegExp(pattern), "u") : pattern,
  );

  return join(string.match(regex), "") ?? "";
}
