// @debt Native `Object.freeze` stands in for `object.freeze`, which a pure constants module may not import because utils are confined.

/**
 * Splits a string around whitespace runs, keeping each run as a separate part.
 */
export const whitespaceRunPattern = Object.freeze(/(\s+)/u);

/**
 * Letters `unaccent` spells out, since canonical decomposition leaves them whole.
 */
export const unaccentLigatures: Readonly<
  Record<string, string>
> = Object.freeze({
  Œ: "OE",
  œ: "oe",
  Æ: "AE",
  æ: "ae",
  ß: "ss",
});

/**
 * Matches a combining mark.
 */
export const combiningMarkPattern = Object.freeze(/\p{M}/u);

/**
 * Matches a word boundary: a run of whitespace, `-`, `_` or `.`, a lowercase to
 * uppercase change, the end of an uppercase run before a capitalized word, and
 * either side of a digit run.
 */
export const wordBoundaryPattern = Object.freeze(
  /[\s\-_.]+|(?<=\p{Ll})(?=\p{Lu})|(?<=\p{Lu})(?=\p{Lu}\p{Ll})|(?<=\p{N})(?=\P{N})|(?<=\P{N})(?=\p{N})/u,
);
