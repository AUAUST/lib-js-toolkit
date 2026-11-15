// @debt Native `Object.freeze` stands in for `object.freeze`, which a pure constants module may not import because utils are confined.

/**
 * Splits a string around whitespace runs, keeping each run as a separate part.
 */
export const whitespaceRunPattern = Object.freeze(/(\s+)/u);
