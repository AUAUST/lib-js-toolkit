import { freeze } from "#modules/object/utils/freeze";

/**
 * Splits a string around whitespace runs, keeping each run as a separate part.
 */
export const whitespaceRunPattern = freeze(/(\s+)/u);

/**
 * Letters `unaccent` spells out, since canonical decomposition leaves them whole.
 */
export const unaccentLigatures: Readonly<Record<string, string>> = freeze({
  Œ: "OE",
  œ: "oe",
  Æ: "AE",
  æ: "ae",
  ß: "ss",
});

/**
 * Matches a combining mark.
 */
export const combiningMarkPattern = freeze(/\p{M}/u);

/**
 * Matches a word boundary: a run of characters that are neither letters, marks
 * nor digits, a lowercase to uppercase change, the end of an uppercase run before
 * a capitalized word, and either side of a digit run.
 */
export const wordBoundaryPattern = freeze(
  /[^\p{L}\p{M}\p{N}]+|(?<=\p{Ll})(?=\p{Lu})|(?<=\p{Lu})(?=\p{Lu}\p{Ll})|(?<=\p{N})(?=\P{N})|(?<=\P{N})(?=\p{N})/u,
);

/**
 * Matches an apostrophe, which `splitWords` removes without breaking the word.
 */
export const apostrophePattern = freeze(/['’]/u);

/**
 * Matches a run of characters that are neither letters nor digits.
 */
export const nonAlphanumericRunPattern = freeze(/[^\p{L}\p{N}]+/u);

/**
 * Matches the run of ASCII digits ending a string.
 */
export const trailingDigitsPattern = freeze(/\d+$/u);
