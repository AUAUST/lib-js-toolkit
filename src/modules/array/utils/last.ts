import type { Maybe } from "#types/Maybe";

/**
 * Returns the last item of an array, or `undefined` when it is empty; a hole
 * reads as `undefined`. A nullish array returns `undefined`.
 */
export function last<Items extends readonly unknown[]>(
  array: Maybe<Items>,
): Items[number] | undefined {
  return array?.at(-1);
}
