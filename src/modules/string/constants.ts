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
