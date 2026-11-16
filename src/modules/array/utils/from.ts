/**
 * Copies an iterable or array-like into a new array, mapping each item when
 * a mapper is given. Unlike `toArray`, it always copies, even an array, and
 * throws on nullish input.
 *
 * @native equal Array.from
 */
export const from = Array.from;
