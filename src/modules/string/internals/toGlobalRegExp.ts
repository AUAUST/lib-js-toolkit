/**
 * Returns a new regex with the source and flags of `regex`, the `g` flag added
 * when missing, so callers never touch the original's `lastIndex`.
 */
export function toGlobalRegExp(regex: RegExp): RegExp {
  return new RegExp(regex, regex.global ? regex.flags : `${regex.flags}g`);
}
