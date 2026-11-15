import type { Maybe } from "#types/Maybe";

/**
 * Returns the item at an index, a negative one counted from the end, or
 * `undefined` when the index falls outside the array; a hole reads as `undefined`,
 * as with `Array.prototype.at`. A nullish array returns `undefined`.
 *
 * @native equal Array.prototype.at
 */
export function at<Items extends readonly unknown[]>(
  array: Maybe<Items>,
  index: number,
): Items[number] | undefined {
  return array?.at(index);
}
