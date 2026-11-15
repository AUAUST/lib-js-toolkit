import { escapeRegExp } from "#modules/string/utils/escapeRegExp";

/**
 * Returns the regex source matching a run of the characters of `chars`,
 * each taken literally.
 */
export function charRunPattern(chars: string): string {
  return `[${escapeRegExp(chars)}]+`;
}
